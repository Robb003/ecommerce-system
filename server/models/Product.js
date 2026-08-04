const  mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {type:String, required: true, trim: true},
    productDescription: {type: String, required: true, trim: true},
    productPrice: {type: Number, required: true, min: 0},
    productCategory: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    productBrand: {type : String, required: true, trim: true},
    stock: {type: Number, required: true, min: 0, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);