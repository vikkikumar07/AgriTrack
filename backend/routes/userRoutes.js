const { signup } = require("../controllers/user.controller");

// common routes
const express = require("express");
let router = express.Router();

router.post("/signup", signup);

module.exports = router;
