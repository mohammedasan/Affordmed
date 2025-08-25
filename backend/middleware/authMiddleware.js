const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    console.log("Authorization Header:", req.headers.authorization);

    next();
  } catch (error) {
    res.status(401).json({ message: "Token Failed" });
  }
};

module.exports = authMiddleware;
