const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. get token from headers
    const token = req.headers.authorization; 
    // usually sent as: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // 2. remove Bearer part
    const actualToken = token.split(" ")[1];

    // 3. verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // 4. attach user data to request
    req.user = decoded;

    next(); // go to next route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;