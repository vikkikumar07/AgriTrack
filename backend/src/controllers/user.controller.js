const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sign up
let signup = async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body;

    if (!fullName || !username || !email || !password || !role) {
      return res
        .status(404)
        .json({ message: "All Fild are required!", success: false });
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

    let newUser = await User.create(user);

    return res
      .status(201)
      .json({ message: "Account Create successfully", success: true, newUser });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error", success: false });
  }
};

//! login user

let login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
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

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ message: "Your password is wrong", success: false });
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
    let { fullName, username, email, password, location, logo } = req.body;
    const { id } = req.params;

    let user = {
      fullName,
      username,
      email,
      location,
      logo,
    };

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
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error", success: false });
  }
};

module.exports = { signup, login, logout, updateProfile };
