const { signup, login, logout } = require("../controllers/user.controller");

// common routes
const express = require("express");
let router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
