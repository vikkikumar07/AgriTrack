const Farming = require("../../models/farmer/farming.schema");
// tasks accsesses
let tasksAccesses = async (req, res) => {
  try {
    const id = req.user.userId;
    let allTasks = await Farming.find({ userId: id });
    if (!tasks) {
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
// tasks delete

module.exports = { tasksAccesses };
