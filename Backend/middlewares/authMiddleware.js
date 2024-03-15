const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  authMiddleware,
};
