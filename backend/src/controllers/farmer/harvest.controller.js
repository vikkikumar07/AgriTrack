const Expenses = require("../../models/farmer/expenses.schema");
const Harvest = require("../../models/farmer/harvest.schema");

// create harvest
let createHarvest = async (req, res) => {
  try {
    const {
      totalHarvest,
      damagedQuantity,
      soldQuantity,
      storedQuantity,
      sellingPrice,
      buyer,
      saleDate,
      transportCost,
    } = req.body;

    const cropId = req.params.cropId;

    if (
      !totalHarvest ||
      !damagedQuantity ||
      !soldQuantity ||
      !sellingPrice ||
      !saleDate
    ) {
      return res
        .status(400)
        .json({ message: "All field are reduired", success: false });
    }

    //totalExpenses rupees
    let expensesDetials = await Expenses.find({ cropId });
    let totalExpenses = 0;
    expensesDetials.map((v) => {
      totalExpenses += v.amount;
    });

    // revenue rupees
    let revenue = soldQuantity * sellingPrice;
    // profitLoss rupees
    let profitLoss = revenue - totalExpenses;
    let plMessage = "";
    if (profitLoss == 0) {
      plMessage = "No Loss";
    } else if (profitLoss > 0) {
      plMessage = "Profit";
    } else {
      plMessage = "Loss";
    }

    let harvestDetials = {
      cropId,
      totalHarvest,
      damagedQuantity,
      soldQuantity,
      storedQuantity,
      sellingPrice,
      buyer,
      saleDate,
      transportCost,
      totalExpenses,
      revenue,
      profitLoss,
      plMessage,
    };

    await Harvest.create(harvestDetials);

    return res
      .status(200)
      .json({ message: "Create successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Not create Please try again", success: false });
  }
};
// delete harvest informations
let deleteHarvest = async (req, res) => {
  try {
    const id = req.params.id;
    await Harvest.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Delete successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Delete data faild", success: false });
  }
};
// get harvest informations form cropId

module.exports = { createHarvest, deleteHarvest };
