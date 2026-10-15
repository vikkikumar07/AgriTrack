const express = require("express");
const farmingTasks = require("../../controllers/farmer/aifarmingtasks.controller");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");
const {
  tasksAccesses,
  tasksCopletedUpdate,
} = require("../../controllers/farmer/farmer.controller");
let router = express.Router();

router.post(
  "/generate/tasks",
  authentication,
  authorize("farmer"),
  farmingTasks,
);

router.get("/gets/tasks", authentication, authorize("farmer"), tasksAccesses);
router.patch(
  "/crops/:cropId/tasks/:taskId/complete",
  authentication,
  authorize("farmer"),
  tasksCopletedUpdate,
);
module.exports = router;
