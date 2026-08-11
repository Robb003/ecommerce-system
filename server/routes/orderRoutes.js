const express = require("express");
const {createOrder, getAllOrders, getMyOrders, cancelOrder} = require("../controllers/orderControllers")
const {protect, authorize} = require("../middleware/authMiddleware");
const route = express.Router();
router.post("/", protect, authorize(["Customer"]), createOrder);
router.get("/all", protect, authorize(["Admin"]), getAllOrders);
router.get("/me", protect, authorize(["Customer"]), getMyOrders);
router.put("/cancel/:Id", protect, authorize(["Customer"]), cancelOrder);

module.exports = router;