const express = require("express");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");
const {
  findAllUser,
  searchUser,
  blockedUnblocked,
  roleManage,
} = require("../../controllers/admin/userManage.controller");
let router = express.Router();

router.get("/findAll/user", authentication, authorize("admin"), findAllUser);
router.get("/find/user", authentication, authorize("admin"), searchUser);
router.post(
  "/isBlocked/user",
  authentication,
  authorize("admin"),
  blockedUnblocked,
);
router.post("/role/:id/user", authentication, authorize("admin"), roleManage);
module.exports = router;
