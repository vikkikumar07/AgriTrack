const jwt = require("jsonwebtoken");
let authentication = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "please login your account", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "please login your account", success: false });
    }
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Session expired. Please login again", success: false });
  }
};

module.exports = authentication;
