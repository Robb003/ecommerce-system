const express = require("express");

const { checkout } = require("../controllers/checkoutController");
const {protect, authorize} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/",protect, authorize(["Customer"]), checkout);

module.exports = router;