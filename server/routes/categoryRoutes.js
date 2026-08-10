const express = require("express");
const {createCategory, getAllCategories, getCategoryById, deleteCategory} = require("../controllers/categoryController");
const {protect, authorize} = require("../controllers/authController");
const router = express.route();

router.post("/", protect, authorize(["Admin"]), createCategory);
router.get("/all", getAllCategories);
router.get("/category/categoryId", getCategoryById);
router.delete("/delete/categoryId", protect, authorize(["Admin"]), deleteCategory);
module.exports = router;