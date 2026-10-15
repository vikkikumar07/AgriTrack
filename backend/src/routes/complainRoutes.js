const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  postComplain,
  deleteComplain,
  getComplain,
} = require("../controllers/complains.controller");

let router = express.Router();

router.post("/create", authentication, postComplain);
router.delete("/delete/:postId", authentication, deleteComplain);
router.get("/find", authentication, getComplain);

module.exports = router;
