const express = require("express");
const {createCategory, getAllCategories, getCategoryById, deleteCategory} = require("../controllers/categoryController");
const {protect, authorize} = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/", protect, authorize(["Admin"]), createCategory);
router.get("/all", getAllCategories);
router.get("/category/:id", getCategoryById);
router.delete("/delete/:id", protect, authorize(["Admin"]), deleteCategory);
module.exports = router;