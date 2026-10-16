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
  "/expenses/:cropId/create",
  authentication,
  authorize("farmer"),
  createExpenses,
);
router.get(
  "/expenses/:cropId/get",
  authentication,
  authorize("farmer"),
  getExpenses,
);
// expenses id not cropId
router.delete(
  "/expenses/:id/delete",
  authentication,
  authorize("farmer"),
  deleteExpenses,
);

router.get(
  "/expenses/:cropId/getAmount",
  authentication,
  authorize("farmer"),
  totelExpensesAmount,
);

module.exports = router;
