const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

// Signup endpoint logic
exports.Signup = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address, role } = req.body;
        
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        
        // 2. Save the dynamic role. Fall back to "Customer" if no role is supplied
        const user = await User.create({ 
            name,
            email,
            phoneNumber,
            address, 
            role: role || "Customer", 
            password: hashed 
        });

        // generate token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error during registration" });
    }
};

// Login endpoint logic
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // generte token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
