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

exports.getAllOrders = async(req, res)=>{
    try {
        if(req.user.role !=="Admin"){
            return res.status(403).json({message: "Only admin can get all orders"});
        };
        const orders = await Order.find()
        .populate("user")
        .populate("items.product");
        if(orders.length ===0){
            return res.status(404).json({message: "Order not found"});
        }
        res.status(200).json(orders);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};
exports.getMyOrders = async(req, res) =>{
    try {
        if(req.user.role !=="Customer"){
            return res.status(403).json({message: "Only a customer can get theit order"});
        }
        const myOrders = await Order.find({customerId: req.user._id})
        .populate("items.product");
        if(myOrders.length ===0){
            return res.status(404).json({message: "No orders found"});
        }
        res.status(200).json(myOrders);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};
exports.cancelOrder = async(req, res)=>{
    try {
        if(req.user.role !=="Customer"){
            return res.status(403).json({message: "Only a customer can cancel an order"});
        }
        const order = await Order.findById(req.params.id)
        .populate("items.product");
        if(!order){
            return res.status(404).json({message: "No order found"});
        }
        await Order.findByIdAndDelete(req.params.id);
        order.orderStatus = "Cancelled";
        await order.save();
        res.status(200).json({message: "Order succefully cancelled"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};
