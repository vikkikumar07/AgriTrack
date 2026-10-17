const express = require("express");
const {
  createHarvest,
  deleteHarvest,
  getHarvest,
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
router.delete("/:id/delete", authentication, deleteHarvest);
router.get("/:cropId/getAll", authentication, getHarvest);
module.exports = router;
