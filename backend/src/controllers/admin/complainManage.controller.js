const Complain = require("../../models/complain.schema");

// seen all complain
let getAllComplain = async (req, res) => {
  try {
    let complains = await Complain.find()
      .populate("userId")
      .sort({ createAt: -1 });
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
    const { adminReply, status } = req.body;
    const id = req.params.postId;

    await Complain.findByIdAndUpdate(
      id,
      {
        $set: { adminReply, status },
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
// delete complain all create main controller

module.exports = { getAllComplain, replyAdmin };
