const User = require("../../models/user.schema");

let findAllUser = async (req, res) => {
  try {
    let users = await User.find().sort({ createAt: -1 });

    if (!users) {
      return res
        .status(404)
        .json({ message: "Not Found user", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};

// search user
let searchUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    let user = await User.find({
      $or: [...(username ? [{ username }] : []), ...(email ? [{ email }] : [])],
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not found user", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};

// blocked unblocked user
let blockedUnblocked = async (req, res) => {
  try {
    const id = req.params.id;

    let user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not found user", success: false });
    }

    if (user.role === "admin") {
      return res
        .status(404)
        .json({ message: "Not block admin", success: false });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      message: user.isBlocked ? "Block successfully" : "Unblock successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};

// role manage
let roleManage = async (req, res) => {
  try {
    const { role } = req.body;
    const id = req.params.id;
    let user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not found user", success: false });
    }

    user.role = role;
    await user.save();

    return res
      .status(200)
      .json({ message: "Change successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
module.exports = { findAllUser, searchUser, blockedUnblocked, roleManage };
