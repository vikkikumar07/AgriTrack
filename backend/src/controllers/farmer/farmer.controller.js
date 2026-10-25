const Expenses = require("../../models/farmer/expenses.schema");
const Farming = require("../../models/farmer/farming.schema");
const Harvest = require("../../models/farmer/harvest.schema");
// tasks accsesses
let farmAccesses = async (req, res) => {
  try {
    // user id
    const id = req.params.id;
    let allTasks = await Farming.find({ userId: id }).sort({ createdAt: -1 });
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
  const { isTask } = req.body;
  try {
    const crop = await Farming.findOneAndUpdate(
      {
        _id: req.params.cropId,
        "tasks._id": req.params.id,
      },
      {
        $set: { "tasks.$.completed": isTask },
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
      .json({
        message: `${isTask ? "Complete" : "Uncheck"} successfully`,
        success: true,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid ID or update error", success: false });
  }
};
// tasks delete
let deleteFarm = async (req, res) => {
  try {
    const id = req.params.cropId;
    await Farming.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ message: "Crop Delete successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "server error", success: false });
  }
};

// signle farm accesse
let farmSignleAccesses = async (req, res) => {
  try {
    const id = req.params.id;
    let farmSignle = await Farming.findById(id);
    if (!farmSignle) {
      return res.status(404).json({ message: "Not Found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, farmSignle });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", success: false });
  }
};

// farmer home page total crop , pendig task & total expenses & letest task, expenses, harvest & sales

let homePageData = async (req, res) => {
  let userId = req.user.userId;
  try {
    // total crop
    let farms = await Farming.find({ userId });
    let totalFarm = farms.length || 0;
    let totalPendingtask = farms.reduce((total, v) => {
      return (
        total + (v?.tasks?.filter((t) => t.completed === false).length || 0)
      );
    }, 0);
    let totalTasks = farms.reduce((sum, v) => sum + (v?.tasks?.length || 0), 0);
    let completedTasks = farms.reduce(
      (sum, v) =>
        sum + (v?.tasks?.filter((t) => t.completed === true).length || 0),
      0,
    );

    let farmsDetails = {
      totalFarm,
      totalTasks,
      totalPendingtask,
      completedTasks,
    };

    let expensesDetials = await Expenses.find({ userId });
    let totalExpenses = expensesDetials.reduce((sum, v) => sum + v.amount, 0);

    let letestCrop = await Farming.findOne({ userId }).sort({ createdAt: -1 });
    let letestExpenses = await Expenses.findOne({ userId })
      .sort({
        createdAt: -1,
      })
      .populate("cropId");
    let letestHarvest = await Harvest.findOne({ userId })
      .sort({
        createdAt: -1,
      })
      .populate("cropId");

    let letest = {
      letestCrop,
      letestExpenses,
      letestHarvest,
    };
    return res.status(200).json({
      message: "Calculate successfully",
      success: true,
      farmsDetails,
      totalExpenses,
      letest,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
module.exports = {
  farmAccesses,
  tasksCopletedUpdate,
  deleteFarm,
  farmSignleAccesses,
  homePageData,
};
