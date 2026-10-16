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
    return res.status(500).json({ message: "server error", success: false });
  }
};

// get expenses by  crop id
let getExpenses = async (req, res) => {};
module.exports = { createExpenses };
