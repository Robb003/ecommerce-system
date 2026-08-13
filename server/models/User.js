const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please provide a valid email address"
        ]
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^(?:\+254|254|0)(7|1)\d{8}$/.test(value);
            },
            message: "Please provide a valid phone number"
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [10, "Password cannot exceed 10 characters"]
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true,
        enum: ["Admin", "Customer"],
        default: "Customer"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);