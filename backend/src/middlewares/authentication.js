const jwt = require("jsonwebtoken");
let authentication = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "please login frist", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "please login frist", success: false });
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

module.exports = authentication;
