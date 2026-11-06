const express = require("express");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");
const {
  findAllUser,
  searchUser,
  blockedUnblocked,
  deshbordData,
  usersData,
  searchBUser,
} = require("../../controllers/admin/userManage.controller");

let router = express.Router();

router.get("/findAll/user", authentication, authorize("admin"), findAllUser);
router.post("/find/user", authentication, authorize("admin"), searchUser);
router.post("/find/buser", authentication, authorize("admin"), searchBUser);
router.post(
  "/isBlocked/user/:id",
  authentication,
  authorize("admin"),
  blockedUnblocked,
);

router.get(
  "/find/deshbord/data",
  authentication,
  authorize("admin"),
  deshbordData,
);

router.get("/find/user/data", authentication, authorize("admin"), usersData);
module.exports = router;
