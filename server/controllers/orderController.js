const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
    try {
        if (req.user.role !== "Customer") {
            return res.status(403).json({
                message: "Only a customer can create an order",
            });
        }

        const { shippingAddress } = req.body;

        // Find the user's cart and load product details
        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        let totalPrice = 0;

        const orderedItems = cart.items.map((item) => {
            const itemTotal = item.product.price * item.quantity;

            totalPrice += itemTotal;

            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            };
        });

        // Create the order
        const order = await Order.create({
            user: req.user._id,
            items: orderedItems,
            totalPrice,
            orderStatus: "Pending",
            paymentStatus: "Unpaid",
            paymentMethod: "M-pesa",
            shippingAddress,
        });

        // Clear the cart
        cart.items = [];
        await cart.save();

        return res.status(201).json({
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};