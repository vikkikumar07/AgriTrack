const express = require("express");
const {
  sendMessage,
  deleteMessage,
  getAllMessage,
} = require("../controllers/aichat.controller");
const authentication = require("../middlewares/authentication");

let router = express.Router();

router.post("/send", authentication, sendMessage);
router.delete("/delete/:id", authentication, deleteMessage);
router.get("/find", authentication, getAllMessage);
module.exports = router;
