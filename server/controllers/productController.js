const Product = require("../models/Product");

exports.createProduct = async(req, res)=>{
    try{
        if(req.user.role !=="Admin"){
            return res.status(403).json({message: "Only Admin can create a product"});
        }
        const {productName, productDescription, productCategory, productPrice, productBrand, stock} = req.body;
        if(!productName || !productDescription || !productCategory || !productPrice || !productBrand || stock===undefined){
            return res.status(400).json({message: "All fields are required"});
        }
        
        const product = await Product.create({
            productName,
            productDescription,
            productCategory,
            productPrice,
            productBrand,
            stock
        });
        res.status(201).json(product);

    } catch (error){
        res.status(500).json({message: error.message})
    }
};

exports.getAllProducts = async(req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error){
        res.status(500).json({message: error.message})
    }
};
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("productCategory");
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteProduct = async(req, res)=>{
    try {
        if(req.user.role !=="Admin"){
            return res.status(403).json({message: "Only Admin can delete a product"});
        }
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Product deleted successfully"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.searchProduct = async (req, res) => {
    try {
        const { name } = req.query;

        const products = await Product.find({
            productName: {
                $regex: name,
                $options: "i"
            }
        });

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};