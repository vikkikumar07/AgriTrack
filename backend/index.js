const express = require("express");
const dbConection = require("./src/config/db");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./src/routes/userRoutes");
const farmarRoutes = require("./src/routes/farmer/farmerRoutes");
const cookieParser = require("cookie-parser");

let app = express();

app.use(cookieParser());
// json from data
app.use(express.json());
// HTML from data accesses
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  }),
);

// call routes
app.use("/web/agritrack/user", userRoutes);
app.use("/web/agritrack/farmer", farmarRoutes);

app.listen(process.env.PORT, () => {
  try {
    console.log("Server start..");
    // connet DataBase
    dbConection();
  } catch (error) {
    console.log(error);
  }
});
