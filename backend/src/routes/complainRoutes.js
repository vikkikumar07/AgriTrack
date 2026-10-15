const express = require("express");
const authentication = require("../middlewares/authentication");
const { postComplain } = require("../controllers/complains.controller");

let router = express.Router();

router.post("/create", authentication, postComplain);
module.exports = router;
