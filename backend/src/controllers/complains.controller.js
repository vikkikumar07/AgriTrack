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
//seen complain

module.exports = { postComplain };
