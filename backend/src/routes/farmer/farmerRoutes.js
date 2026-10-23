const express = require("express");
const farmingTasks = require("../../controllers/farmer/aifarmingtasks.controller");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");
const {
  tasksCopletedUpdate,
  deleteFarm,
  farmAccesses,
  farmSignleAccesses,
} = require("../../controllers/farmer/farmer.controller");

let router = express.Router();

router.post(
  "/generate/farm",
  authentication,
  authorize("farmer"),
  farmingTasks,
);

// user id
router.get("/gets/farms/:id", authentication, farmAccesses);
router.patch(
  "/crops/:cropId/tasks/:taskId/complete",
  authentication,
  authorize("farmer"),
  tasksCopletedUpdate,
);

router.get("/gets/farmSignle/:id", authentication, farmSignleAccesses);
router.delete("/crops/:cropId/tasks/delete", authentication, deleteFarm);

module.exports = router;
