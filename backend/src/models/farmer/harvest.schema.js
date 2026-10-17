const mongoose = require("mongoose");

let harvestSchema = mongoose.Schema(
  {
    cropId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farming",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalHarvest: {
      // Quintal
      type: Number,
      required: true,
    },
    damagedQuantity: {
      //Quintal
      type: Number,
      default: 0,
    },
    soldQuantity: {
      //Quintal
      type: Number,
      required: true,
    },
    storedQuantity: {
      //Quintal
      type: Number,
      default: 0,
    },
    sellingPrice: {
      // unit rupees
      type: Number,
      required: true,
    },
    buyer: {
      type: String,
      default: "",
    },
    saleDate: {
      type: Date,
      required: true,
    },
    transportCost: {
      // always rupess
      type: Number,
      default: 0,
    },
    totalExpenses: {
      // rupees
      type: Number,
      default: 0,
    },
    revenue: {
      // unit rupees
      type: Number,
      default: 0,
    },
    profitLoss: {
      // rupees
      type: Number,
      default: 0,
    },
    plMessage: String,
  },
  { timestamps: true },
);

let Harvest = mongoose.model("Harvest", harvestSchema);

module.exports = Harvest;
