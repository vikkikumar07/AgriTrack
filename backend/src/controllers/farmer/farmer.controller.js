const Farming = require("../../models/farmer/farming.schema");
// tasks accsesses
let tasksAccesses = async (req, res) => {
  try {
    const id = req.user.userId;
    let allTasks = await Farming.find({ userId: id });
    if (!allTasks) {
      return res.status(404).json({ message: "Not Found", success: false });
    }

    return res
      .status(401)
      .json({ message: "Found successfully", success: true, allTasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", success: false });
  }
};

// task of tasks completed update
let tasksCopletedUpdate = async (req, res) => {
  try {
    const crop = await Farming.findOneAndUpdate(
      {
        _id: req.params.cropId,
        "tasks._id": req.params.taskId,
      },
      {
        $set: { "tasks.$.completed": true },
      },
      { new: true, runValidators: true },
    );

    if (!crop) {
      return res
        .status(404)
        .json({ message: "Crop ya task nahi mila", success: false });
    }

    return res
      .status(200)
      .json({ message: "complete successfully", success: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid ID ya update error", success: false });
  }
};
// tasks delete

module.exports = { tasksAccesses, tasksCopletedUpdate };
