const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadToCloudinary = require("../config/cloudinary");
const Farming = require("../models/farmer/farming.schema");
const Expenses = require("../models/farmer/expenses.schema");
const Harvest = require("../models/farmer/harvest.schema");
const Complain = require("../models/complain.schema");
const Chat = require("../models/aichat.schema");

// sign up
let signup = async (req, res) => {
  try {
    const { fullName, username, email, password, role, secret } = req.body;

    if (!fullName || !username || !email || !password || !role) {
      return res
        .status(404)
        .json({ message: "All Fild are required!", success: false });
    }
    if (role === "admin") {
      if (secret !== process.env.ADMIN_SECRET_KEY) {
        return res
          .status(404)
          .json({ message: "Wrong secret key", success: false });
      }
    }
    // check email in database
    let isFindEmail = await User.findOne({ email });
    if (isFindEmail) {
      return res
        .status(401)
        .json({ message: "Email Allready Exist", success: false });
    }

    // check usename in database
    let isFindUsername = await User.findOne({ username });
    if (isFindUsername) {
      return res
        .status(401)
        .json({ message: "username Allready Exist", success: false });
    }

    // pass chenge bcrypt
    let hashPassword = await bcrypt.hash(password, 10);

    let user = {
      fullName,
      username,
      email,
      password: hashPassword,
      role,
    };

    await User.create(user);

    return res
      .status(201)
      .json({ message: "Account Create successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error", success: false });
  }
};

//! login user

let login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(409)
        .json({ message: "fill this information", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Your email is wrong", success: false });
    }

    if (user.isBlocked) {
      return res
        .status(404)
        .json({ message: "your account is blocked", success: false });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ message: "Your password is wrong", success: false });
    }

    if (user.role !== role) {
      return res
        .status(404)
        .json({ message: "Please select correct role", success: false });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "login successfully", success: true, user: user });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error", success: false });
  }
};

// update
let updateProfile = async (req, res) => {
  try {
    let { fullName, username, email, password, location } = req.body;
    const { id } = req.params;

    let user = {
      fullName,
      username,
      email,
      location,
    };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      user.logo = result.secure_url;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // cloudnary use hoga logo ke liye
    let updateUser = await User.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true, runValidators: true },
    );

    if (!updateUser) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }

    return res.status(201).json({
      message: "Update successfully",
      success: true,
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error", success: false });
  }
};

// logout

let logout = (req, res) => {
  try {
    res.cookie("token", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
    });

    return res
      .status(200)
      .json({ message: "Logout successfully", success: true, user: "" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error", success: false });
  }
};

// account delete
let deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await Promise.all([
      Farming.deleteMany({ userId: id }),
      Expenses.deleteMany({ userId: id }),
      Harvest.deleteMany({ userId: id }),
      Complain.deleteMany({ userId: id }),
      Chat.deleteMany({ userId: id }),
    ]);

    await User.findByIdAndDelete(id);

    res.cookie("token", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
    });

    return res.status(200).json({
      message: "Account Delete successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server Error", success: false, error });
  }
};

let authMe = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        message: "please login your account",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Welcome Back",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  deleteProfile,
  authMe,
};
