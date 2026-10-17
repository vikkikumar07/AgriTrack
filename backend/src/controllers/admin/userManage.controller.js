const User = require("../../models/user.schema");

let findAllUser = async (req, res) => {
  try {
    let users = await User.find();

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
        .json({ message: "Not Found user", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
module.exports = { findAllUser, searchUser };
