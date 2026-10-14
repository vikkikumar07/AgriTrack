const {
  signup,
  login,
  logout,
  updateProfile,
  deleteProfile,
  authMe,
} = require("../controllers/user.controller");

const upload = require("../middlewares/upload");

// common routes
const express = require("express");
const authentication = require("../middlewares/authentication");
let router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authentication, logout);
router.patch("/update/:id", authentication, upload, updateProfile);
router.delete("/delete/profile/:id", authentication, deleteProfile);
router.post("/authme", authentication, authMe);

module.exports = router;
