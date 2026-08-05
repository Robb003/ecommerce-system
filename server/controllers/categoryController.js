const Category = require("../models/Category");

exports.createCategory = async(req, res)=>{
    try {
        if(req.user.role !=="Admin"){
            return res.status(403).json({message: "Only Admin can create a category"});
        }
        const {categoryName, categoryDescription} = req.body;
        if(!categoryName || categoryDescription){
            return res.status(400).json({message: "All fields are required"});
        }
        if(categoryExist){
            return res.status(400).json({message: "Category already exists"});
        }
        const category = await Category.create({
            categoryName,
            categoryDescription
        });
        res.status(201).json(category);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.getAllCategories = async(req, res)=>{
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.deleteCategory = async(req, res)=>{
    try {
        if(req.user.role !=="Admin"){
            return res.status(403).json({message: "Only Admin can delete the category"});
        }
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        await category.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Category deleted successfully"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}