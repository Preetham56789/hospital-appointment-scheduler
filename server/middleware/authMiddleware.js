const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 🔑 Extract token
    const token = authHeader.split(" ")[1];

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ❌ Invalid token payload
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // 👤 Fetch full user from DB
    const user = await User.findById(decoded.id).select("-password");

    // ❌ User not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Attach full user object
    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;