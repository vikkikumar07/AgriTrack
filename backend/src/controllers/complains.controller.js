const Complain = require("../models/complain.schema");

// user post complian
let postComplain = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const { userId } = req.user;

    if (!subject || !message) {
      return res
        .status(400)
        .json({ message: "All filed are required", success: false });
    }
    let complainFarmer = {
      userId,
      subject,
      message,
    };
    await Complain.create(complainFarmer);

    return res
      .status(201)
      .json({ message: "complain successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
// user delete complain
let deleteComplain = async (req, res) => {
  const id = req.params.postId;
  try {
    await Complain.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ message: "Delete successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
//seen complain
let getComplain = async (req, res) => {
  try {
    const id = req.params.id;
    let complains = await Complain.find({ userId: id }).sort({ createAt: -1 });
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
module.exports = { postComplain, deleteComplain, getComplain };
