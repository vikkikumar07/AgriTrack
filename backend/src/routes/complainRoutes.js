const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  postComplain,
  deleteComplain,
  getComplain,
} = require("../controllers/complains.controller");
const {
  getAllComplain,
  replyAdmin,
  statusChange,
  searchByStatus,
  complainsPageData,
} = require("../controllers/admin/complainManage.controller");
const authorize = require("../middlewares/authorize");

let router = express.Router();

//farmer and exparts
router.post("/create", authentication, postComplain);
router.get("/find/:id", authentication, getComplain);
// farmar, exparts and admin
router.delete("/delete/:postId", authentication, deleteComplain);

// admin
router.get("/findAll", authentication, authorize("admin"), getAllComplain);
// complains admin page data
router.get(
  "/find/complain/data",
  authentication,
  authorize("admin"),
  complainsPageData,
);
// search by status
router.post(
  "/search/status",
  authentication,
  authorize("admin"),
  searchByStatus,
);

router.patch(
  "/update/reply/:postId",
  authentication,
  authorize("admin"),
  replyAdmin,
);
router.patch(
  "/update/status/:postId",
  authentication,
  authorize("admin"),
  statusChange,
);
module.exports = router;
