const express = require("express");
const {createOrder, getAllOrders, getMyOrders, cancelOrder} = require("../controllers/orderController")
const {protect, authorize} = require("../middleware/authMiddleware");
const router = express.Router();
//router.post("/", protect, authorize(["Customer"]), createOrder);
router.get("/all", protect, authorize(["Admin"]), getAllOrders);
router.get("/me", protect, authorize(["Customer"]), getMyOrders);
router.put("/cancel/:id", protect, authorize(["Customer"]), cancelOrder);

module.exports = router;