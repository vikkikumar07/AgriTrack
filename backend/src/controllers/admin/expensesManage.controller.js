const Expenses = require("../../models/farmer/expenses.schema");

// update expenses
let updateExpenses = async (req, res) => {
  const id = req.params.id;
  const { category, date, quantity, unit, rate, amount, description } =
    req.body;

  let expensesDetials = {
    category,
    date,
    quantity,
    unit,
    rate,
    amount,
    description,
  };

  try {
    let result = await Expenses.findByIdAndUpdate(
      id,
      { $set: expensesDetials },
      { new: true, runValidators: true },
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: "Expenses not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Update successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Not update try again", success: false });
  }
};

module.exports = updateExpenses;
