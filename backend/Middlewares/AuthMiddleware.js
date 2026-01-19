const jwt = require('jsonwebtoken');
require("dotenv").config();
const { UserModel } = require("../model/UserModel");

module.exports.userVerification = async (req, res, next) => {
  
  try {
    
    const token = req.cookies?.token
    
    if (!token) { return res.json({ message: "Token missing" }); }

    if (!process.env.TOKEN_KEY) { throw new Error("JWT secret missing"); }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) { return res.status(401).json({ message: "User not found" }); } 
    
    req.user = user; 

    const data = {
      user: user,
      status: true
    }
    res.json(data)

    next();

  } catch (err) {

    console.error("Auth error:", err.message);

    return res.status(401).json({ message: "Invalid or expired token" });

  }
};
