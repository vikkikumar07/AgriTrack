const express = require("express");
const {
  sendMessage,
  deleteMessage,
} = require("../controllers/aichat.controller");
const authentication = require("../middlewares/authentication");

let router = express.Router();

router.post("/send", authentication, sendMessage);
router.delete("/delete/:id", authentication, deleteMessage);
module.exports = router;
