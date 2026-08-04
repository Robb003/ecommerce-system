const mongoose = require ("mongoose");
const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    orderedItems: [{
        product:{ type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity: {type: Number, required: true, min: 1},
        price: {type: Number, required: true,}
    }],
    shippingAddress: {type: String, required: true, trim: true},
    paymentMethod: {type: String, required: true, enum:["M-pesa", "Cash on delivery"], default: "M-pesa"},
    totalPrice: {type: Number, required: true, default: 0},
    orderStatus: {type: String, required: true, enum:["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending"},
    paymentStatus: {type: String, enum["Pending", "Paid"], default: "pending"},
    transactionId: {type: String}
},{timestamps: true});
module.exports =mongoose.model("Order", orderSchema);