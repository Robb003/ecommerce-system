const express = require("express");
const router = express.Router();

const { checkout } = require("../controllers/checkoutController");
const {protect, authorize} = require("../middleware/authmiddleware");

router.post("/",protect, authorize(["Customer"]), checkout);

module.exports = router;