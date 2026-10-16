const mongoose = require("mongoose");

const categories = [
  "Seeds",
  "Fertilizer",
  "Pesticide",
  "Labour",
  "Irrigation",
  "Electricity",
  "Diesel",
  "Machinery",
  "Transport",
  "Other",
];

let expensesSchema = mongoose.Schema({
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farming",
    required: true,
  },
  category: {
    type: String,
    enum: categories,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Date,
    required: true,
  },
  rate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // unit ==> rupees

  description: {
    type: String,
  },
});

let Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
