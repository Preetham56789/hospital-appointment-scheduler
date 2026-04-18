const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 🔥 Extract token properly
    const token = authHeader.split(" ")[1];

    console.log("RECEIVED TOKEN:", token);

    // 🔥 VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("TOKEN ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};