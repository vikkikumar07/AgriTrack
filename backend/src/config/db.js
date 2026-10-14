const mongoose = require("mongoose");

const dbConection = () => {
  mongoose
    .connect(process.env.MONGOOSE_URI)
    .then(() => {
      console.log("DataBase Connect.");
    })
    .catch((e) => {
      console.log("DB Not Connect");
      console.log(e);
    });
};

module.exports = dbConection;
