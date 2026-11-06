const Complain = require("../../models/complain.schema");
const User = require("../../models/user.schema");

let findAllUser = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });

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

// deshbord data
let deshbordData = async (req, res) => {
  try {
    let users = await User.find();
    let totalUsers = users.length || 0;
    let totalBlockUsers = users.filter((t) => t.isBlocked === true).length || 0;
    let totalUnBlockUsers =
      users.filter((t) => t.isBlocked === false).length || 0;

    let complains = await Complain.find();
    let totalComplains = complains.length || 0;

    let recentUsers = await User.find().sort({ createdAt: -1 }).limit(10);

    let recentComplain = await Complain.find().sort({ createdAt: -1 }).limit(4);

    let DeshbordDatas = {
      totalUsers,
      totalBlockUsers,
      totalUnBlockUsers,
      totalComplains,
      recentUsers,
      recentComplain,
    };

    return res
      .status(200)
      .json({ message: "Data successfully", success: true, DeshbordDatas });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};

let usersData = async (req, res) => {
  try {
    let users = await User.find();
    let totalUsers = users.length || 0;
    let totalBlockUsers = users.filter((t) => t.isBlocked === true).length || 0;
    let totalUnBlockUsers =
      users.filter((t) => t.isBlocked === false).length || 0;

    let totalFarmers = users.filter((t) => t.role === "farmer").length || 0;

    let usersDatas = {
      totalUsers,
      totalBlockUsers,
      totalUnBlockUsers,
      totalFarmers,
    };

    return res
      .status(200)
      .json({ message: "Data successfully", success: true, usersDatas });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
module.exports = {
  findAllUser,
  searchUser,
  blockedUnblocked,
  deshbordData,
  usersData,
};
