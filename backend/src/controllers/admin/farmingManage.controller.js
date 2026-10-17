const Farming = require("../../models/farmer/farming.schema");

let taskUpdate = async (req, res) => {
  const fields = ["title", "dueDate", "quantity", "description", "completed"];
  const set = {};

  for (const field of fields) {
    // check value in req body
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      set[`tasks.$.${field}`] = req.body[field];
    }
  }
  // lenth of set
  if (Object.keys(set).length === 0) {
    return res
      .status(400)
      .json({ message: "Update ke liye koi field nahi bheji" });
  }
  try {
    const crop = await Farming.findOneAndUpdate(
      {
        _id: req.params.cropId,
        "tasks._id": req.params.taskId,
      },
      {
        $set: set,
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
      .json({ message: "Update successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ message: "Invalid ID or update error", success: false });
  }
};

module.exports = { taskUpdate };
