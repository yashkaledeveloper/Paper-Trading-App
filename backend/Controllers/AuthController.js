require("dotenv").config();
const { UserModel } = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const { WalletModel } = require("../model/WalletModel");

module.exports.Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/"
  });

  res.json({ message: "Logged out" });
}

module.exports.Signup = async (req, res) => {

  try {
    const { email, password, username } = req.body;

    // 1. Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create user
    const user = await UserModel.create({
      email, password, username,
    });

    // 3. Create wallet IMMEDIATELY after user creation
    await WalletModel.create({
      userId: user._id,
      // balance will default to 100000
    });

    // 4. Generate token
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true, // true only in HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    // 5. Send response
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }

    const auth = await bcrypt.compare(password, user.password)

    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true, // true only in 
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(201).json({ message: "User logged in successfully", success: true });

  } catch (error) {
    console.error(error);
  }
}