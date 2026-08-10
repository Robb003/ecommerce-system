const express = require("express");
const {protect, authorize} = require("../middleware/authMiddleware");
const {createProduct, getAllProducts, getProductById, deleteProduct, searchProduct} = require("../controllers/productController");
const router = express.Router();

router.post("/", protect, authorize(["Admin"]), createProduct);
router.get("/all",getAllProducts);
router.get("/product/productId", getProductById);
router.delete("/delete/productId", protect, authorize(["Admin"]), deleteProduct);

module.exports = router;