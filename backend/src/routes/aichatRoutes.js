const express = require("express");
const { sendMessage } = require("../controllers/aichat.controller");
const authentication = require("../middlewares/authentication");

let router = express.Router();

router.post("/send", authentication, sendMessage);
module.exports = router;
