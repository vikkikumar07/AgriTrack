const express = require("express");
const {
  createHarvest,
} = require("../../controllers/farmer/harvest.controller");
const authentication = require("../../middlewares/authentication");
const authorize = require("../../middlewares/authorize");

let router = express.Router();
router.post(
  "/:cropId/create",
  authentication,
  authorize("farmer"),
  createHarvest,
);
module.exports = router;
