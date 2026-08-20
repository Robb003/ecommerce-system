const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/checkout", require('./routes/checkoutRoutes.js'));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/mpesa", require("./routes/mpesaRoute"));


connectDB();
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)})
