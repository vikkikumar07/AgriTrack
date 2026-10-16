const express = require("express");
const {
  createExpenses,
  getExpenses,
  deleteExpenses,
} = require("../../controllers/farmer/expenses.controller");

let router = express.Router();

router.post("/expenses/:cropId/create", createExpenses);
router.get("/expenses/:cropId/get", getExpenses);
// expenses id not cropId
router.delete("/expenses/:id/delete", deleteExpenses);

module.exports = router;
