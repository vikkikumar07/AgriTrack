const Farming = require("../../models/farmer/farming.schema");
// tasks accsesses
let tasksAccesses = async (req, res) => {
  try {
    const id = req.params.id;
    let allTasks = await Farming.find({ userId: id }).sort({ createAt: -1 });
    if (!allTasks) {
      return res.status(404).json({ message: "Not Found", success: false });
    }

    return res
      .status(200)
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
        .json({ message: "Task not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "complete successfully", success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid ID or update error", success: false });
  }
};
// tasks delete
let deleteTasks = async (req, res) => {
  try {
    const id = req.params.cropId;
    await Farming.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ message: "Crop Tasks Delete successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "server error", success: false });
  }
};
module.exports = { tasksAccesses, tasksCopletedUpdate, deleteTasks };
