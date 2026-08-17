const Order = require("../models/Order");

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
        const myOrders = await Order.find({user: req.user._id})
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
        //check the order belongs to the logged in user
        if(order.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "You can only cancel your order"});
        }
        //prevent cancelling an already delivered order

        if(order.orderStatus ==="Delivered"){
            return res.status(400).json({message: "Delivered orders cannot be cancelled"});
        }

        //prevent cancelling an order twice
        if(order.orderStatus ==="Cancelled"){
            return res.status(400).json({message: "Order is already cancelled"});
        }
        order.orderStatus = "Cancelled";
        await order.save();
        return res.status(200).json({message: "Order succefully cancelled"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};
