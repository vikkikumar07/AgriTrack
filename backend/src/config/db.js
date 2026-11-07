const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Database Connected.");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    throw error;
  }
};

module.exports = dbConection;
