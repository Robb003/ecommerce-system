const  mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    path: {type: String, required: true},
    filename: {type: String}
}, {_id: false});

const productSchema = new mongoose.Schema({
    productName: {type:String, required: true, trim: true},
    productDescription: {type: String, required: true, trim: true},
    productPrice: {type: Number, required: true, min: 0},
    productCategory: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    productBrand: {type : String, required: true, trim: true},
    stock: {type: Number, required: true, min: 0, default: 0},
    image: imageSchema
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);