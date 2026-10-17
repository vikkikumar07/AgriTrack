const express = require("express");
const {
  createExpenses,
  getExpenses,
  deleteExpenses,
  totelExpensesAmount,
} = require("../../controllers/farmer/expenses.controller");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");

let router = express.Router();

router.post(
  "/:cropId/create",
  authentication,
  authorize("farmer"),
  createExpenses,
);
router.get("/:cropId/get", authentication, getExpenses);
// expenses id not cropId
router.delete("/:id/delete", authentication, deleteExpenses);

router.get("/:cropId/getAmount", authentication, totelExpensesAmount);

module.exports = router;
