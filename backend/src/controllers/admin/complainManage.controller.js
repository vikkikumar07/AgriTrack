const Complain = require("../../models/complain.schema");

// seen all complain
let getAllComplain = async (req, res) => {
  try {
    let complains = await Complain.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    if (!complains) {
      return res
        .status(400)
        .json({ message: "Not found complain", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, complains });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
// reply massage
let replyAdmin = async (req, res) => {
  try {
    const { adminReply } = req.body;
    const id = req.params.postId;

    await Complain.findByIdAndUpdate(
      id,
      {
        $set: { adminReply },
      },
      { new: true, runValidators: true },
    );

    return res
      .status(200)
      .json({ message: "Update successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
let statusChange = async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.postId;

    await Complain.findByIdAndUpdate(
      id,
      {
        $set: { status },
      },
      { new: true, runValidators: true },
    );

    return res
      .status(200)
      .json({ message: "Update successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};

let searchByStatus = async (req, res) => {
  let { input } = req.body;

  if (!input) {
    return res
      .status(400)
      .json({ message: "Please select option", success: false });
  }
  try {
    let complains = await Complain.find({ status: input })
      .populate("userId")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ message: "found successfully", success: true, complains });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};

let complainsPageData = async (req, res) => {
  try {
    let complains = await Complain.find();

    let totalComplains = complains.length || 0;
    let totalPendingComplains =
      complains.filter((t) => t.status === "Pending").length || 0;
    let totalInProgressComplains =
      complains.filter((t) => t.status === "In Progress").length || 0;
    let totalResolvedComplains =
      complains.filter((t) => t.status === "Resolved").length || 0;

    let complainsData = {
      totalComplains,
      totalPendingComplains,
      totalInProgressComplains,
      totalResolvedComplains,
    };

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, complainsData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
// delete complain all create main controller

module.exports = {
  getAllComplain,
  replyAdmin,
  statusChange,
  searchByStatus,
  complainsPageData,
};
