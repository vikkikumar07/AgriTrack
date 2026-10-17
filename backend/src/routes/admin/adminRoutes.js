const express = require("express");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");
const {
  findAllUser,
  searchUser,
} = require("../../controllers/admin/userManage.controller");
let router = express.Router();

router.get("/findAll/user", authentication, authorize("admin"), findAllUser);
router.get("/find/user", authentication, authorize("admin"), searchUser);
module.exports = router;
