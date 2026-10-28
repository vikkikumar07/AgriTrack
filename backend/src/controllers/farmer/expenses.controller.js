const Expenses = require("../../models/farmer/expenses.schema");

// create expenses
let createExpenses = async (req, res) => {
  try {
    const { category, date, quantity, unit, rate, amount, description } =
      req.body;
    const cropId = req.params.cropId;
    const userId = req.user.userId;

    if (!category || !date || !quantity || !unit || !rate || !amount) {
      return res
        .status(400)
        .json({ message: "All field are required", success: false });
    }

    let expensesDetials = {
      cropId,
      userId,
      category,
      date,
      quantity,
      unit,
      rate,
      amount,
      description,
    };

    await Expenses.create(expensesDetials);

    return res
      .status(200)
      .json({ message: "Create successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Not create expenses", success: false });
  }
};

// get expenses by  crop id
let getExpenses = async (req, res) => {
  try {
    const cropId = req.params.cropId;
    let expensesDetials = await Expenses.find({ cropId }).sort({
      createdAt: -1,
    });

    if (!expensesDetials[0]) {
      return res
        .status(404)
        .json({ message: "Expenses not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, expensesDetials });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Failed to found expenses", success: false });
  }
};

// get expenses by category id
let getExpensesCategory = async (req, res) => {
  try {
    const { category } = req.body;
    let expensesDetials = await Expenses.find({ category }).sort({
      createdAt: -1,
    });

    if (!expensesDetials[0]) {
      return res
        .status(404)
        .json({ message: "Expenses not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, expensesDetials });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Failed to found expenses", success: false });
  }
};

// delete expenses data
let deleteExpenses = async (req, res) => {
  try {
    const id = req.params.id;

    let result = await Expenses.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Expenses not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Delete successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Failed to delete expenses", success: false });
  }
};

// totel calculate expenses Amount
let totelExpensesAmount = async (req, res) => {
  try {
    const cropId = req.params.cropId;
    let expensesDetials = await Expenses.find({ cropId });

    let totelAmount = 0;
    expensesDetials.map((v) => {
      totelAmount += v.amount;
    });

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, totelAmount });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};

let getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;
    let allExpenses = await Expenses.find({ userId })
      .sort({
        createdAt: -1,
      })
      .populate("cropId");

    if (!allExpenses[0]) {
      return res
        .status(404)
        .json({ message: "Expenses not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Found successfully", success: true, allExpenses });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Failed to found expenses", success: false });
  }
};
module.exports = {
  createExpenses,
  getExpenses,
  deleteExpenses,
  totelExpensesAmount,
  getAllExpenses,
  getExpensesCategory,
};
