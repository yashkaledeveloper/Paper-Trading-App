const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ attach user to request
    req.user = {
      id: user._id,
      username: user.username,
    };

    next(); // 🔥 MOST IMPORTANT LINE
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
