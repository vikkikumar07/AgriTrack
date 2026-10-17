const Harvest = require("../../models/farmer/harvest.schema");
// update harvest
let updateHarvest = async (req, res) => {
  const id = req.params.id;
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

  let harvestDetials = {
    totalHarvest,
    damagedQuantity,
    soldQuantity,
    storedQuantity,
    sellingPrice,
    buyer,
    saleDate,
    transportCost,
  };

  try {
    let result = await Harvest.findByIdAndUpdate(
      id,
      { $set: harvestDetials },
      { new: true, runValidators: true },
    );

    if (!result) {
      return res.status(404).json({ message: "Not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Update successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Not update try again", success: false });
  }
};

module.exports = updateHarvest;
