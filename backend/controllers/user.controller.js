const express = require("express");
const User = require("../models/user.schema");
const bcrypt = require("bcrypt");

// sign up
let signup = async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body;

    if (!fullName || !username || !email || !password || !role) {
      return res
        .status(401)
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

    await User.create(user);

    return res
      .status(201)
      .json({ message: "Account Create successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error", success: false });
  }
};

module.exports = { signup };
