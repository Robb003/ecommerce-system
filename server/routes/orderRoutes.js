const express = require("express");
const {createOrder, getAllOrders, getMyOrders, cancelOrder} = require("../controllers/orderControllers")
const {protect, authorize} = require("../middleware/authMiddleware");
const route = express.router();
router.post("/", protect, authorize(["Customer"]), createOrder);
router.get("/all", protect, authorize(["Admin"]), getAllOrders);
router.get("/me", protect, authorize(["Customer"]), getMyOrders);
router.put("/cancel/orderId", protect, authorize(["Customer"]), cancelOrder);

module.exports = router;