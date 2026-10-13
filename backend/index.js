const express = require("express");
const dbConection = require("./config/db");
const cors = require("cors");
require("dotenv").config();
let app = express();
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  }),
);

app.listen(process.env.PORT, () => {
  try {
    console.log("Server start..");
    dbConection();
  } catch (error) {
    console.log(error);
  }
});
