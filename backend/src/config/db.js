const mongoose = require("mongoose");

const dbConection = async () => {
  await mongoose.connect(process.env.MONGOOSE_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  console.log("Database Connected.");
};

module.exports = dbConection;
