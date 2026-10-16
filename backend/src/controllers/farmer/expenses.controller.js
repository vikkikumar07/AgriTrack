const Expenses = require("../../models/farmer/expenses.schema");

// create expenses
let createExpenses = async (req, res) => {
  try {
    const { category, date, quantity, rate, amount, description } = req.body;
    const cropId = req.params.cropId;

    if (!category || !date || !quantity || !rate || !amount) {
      return res
        .status(400)
        .json({ message: "All field are required", success: false });
    }

    let expensesDetials = {
      cropId,
      category,
      date,
      quantity,
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
    let expensesDetials = await Expenses.find({ cropId });

    if (!expensesDetials) {
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
      .json({ message: "Failed to delete expenses", success: false });
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
module.exports = { createExpenses, getExpenses, deleteExpenses };
