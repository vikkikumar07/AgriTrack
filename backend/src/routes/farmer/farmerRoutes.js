const express = require("express");
const farmingTasks = require("../../controllers/farmer/aifarmingtasks.controller");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");
let router = express.Router();

router.post(
  "/generate/tasks",
  authentication,
  authorize("farmer"),
  farmingTasks,
);
module.exports = router;
