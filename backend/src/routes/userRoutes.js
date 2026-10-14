const { signup, login, logout } = require("../controllers/user.controller");

// common routes
const express = require("express");
const authentication = require("../middlewares/authentication");
let router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authentication, logout);

module.exports = router;
