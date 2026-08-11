const express = require("express");
const {createCart, removeProduct, updateCart, getCart} = require("../controllers/cartControllers");
const {protect, authorize} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, authorize(["Customer"]), createCart);
router.delete("/remove/:id", protect, authorize(["Customer"]), removeProduct);
router.put("/update/:id", protect, authorize(["Customer"]), updateCart);
router.get("/me", protect, authorize(["Customer"]), getCart);

module.exports = router;