const mongoose = require("mongoose");

let harvestSchema = mongoose.Schema(
  {
    cropId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farming",
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
      required: true,
    },
    soldQuantity: {
      //Quintal
      type: Number,
      required: true,
    },
    storedQuantity: {
      //Quintal
      type: Number,
      required: true,
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
      required: true,
    },
    totalExpenses: {
      // rupees
      type: Number,
    },
    revenue: {
      // unit rupees
      type: Number,
    },
    profitLoss: {
      // rupees
      type: Number,
    },
  },
  { timestamps: true },
);

let Harvest = mongoose.model("Harvest", harvestSchema);

module.exports = Harvest;
