const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { triggerStkPush } = require("../utils/mpesa");
exports.checkout = async (req, res) => {
    try {
        // Check if the user is a customer
        if (req.user.role !== "Customer") {
            return res.status(403).json({
                message: "Only a customer can checkout",
            });
        }

        const { shippingAddress } = req.body;

        // Find the customer's cart and load product details
        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        // Check if cart exists and isn't empty
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        // Check stock before creating the order
        for (const item of cart.items) {

            // Check if product still exists
            if (!item.product) {
                return res.status(400).json({
                    message: "One of the products in your cart no longer exists",
                });
            }

            // Check available stock
            if (item.quantity > item.product.stock) {
                return res.status(400).json({
                    message: `${item.product.productName} has only ${item.product.stock} items available`,
                });
            }
        }

        // Calculate total price
        let totalPrice = 0;

        const orderedItems = cart.items.map((item) => {
            const itemTotal =
                item.product.productPrice * item.quantity;

            totalPrice += itemTotal;

            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.productPrice,
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
        //initiate mpesa stk push
        const mpesaResponse = await triggerStkPush(
            req.user.phoneNumber,
            totalPrice,
            order._id
        );
        //save safaricom request IDs
        order.merchantRequestId = mpesaResponse.MerchantRequestID;
        order.checkoutRequestId = mpesaResponse.CheckoutRequestID;

        await order.save();
        


        return res.status(201).json({
            message: "Order created successfully. Proceed to payment.",
            order,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};