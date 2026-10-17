const express = require("express");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");
const {
  findAllUser,
  searchUser,
  blockedUnblocked,
  roleManage,
} = require("../../controllers/admin/userManage.controller");
const {
  taskUpdate,
} = require("../../controllers/admin/farmingManage.controller");
const updateExpenses = require("../../controllers/admin/expensesManage.controller");
const updateHarvest = require("../../controllers/admin/harvestManage.controller");

let router = express.Router();

router.get("/findAll/user", authentication, authorize("admin"), findAllUser);
router.get("/find/user", authentication, authorize("admin"), searchUser);
router.post(
  "/isBlocked/user/:id",
  authentication,
  authorize("admin"),
  blockedUnblocked,
);
router.post("/role/user/:id", authentication, authorize("admin"), roleManage);

router.patch(
  "/crops/:cropId/tasks/:taskId/update",
  authentication,
  authorize("admin"),
  taskUpdate,
);

router.patch(
  "/expenses/update/:id",
  authentication,
  authorize("admin"),
  updateExpenses,
);

router.patch(
  "/harvest/update/:id",
  authentication,
  authorize("admin"),
  updateHarvest,
);
module.exports = router;
