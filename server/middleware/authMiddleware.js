const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Check token and fetch the fresh live database user
exports.protect = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = auth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Look up the user by ID directly in MongoDB to get their live, real-time role!
        const liveUser = await User.findById(decoded.id).select("-password");
        
        if (!liveUser) {
            return res.status(404).json({ message: "User account no longer exists" });
        }

        // Attach the live database user document to the request lifecycle object
        req.user = liveUser; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Check dynamic route permission authorizations
exports.authorize = (allowedRoles) => {
    return (req, res, next) => {
        // Double-check if the live database role clears the access target array
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "forbidden" });
        }
        next();
    };
};
