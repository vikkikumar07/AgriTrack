require("dotenv").config();
const express = require("express");
const dbConection = require("./src/config/db");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const farmerRoutes = require("./src/routes/farmer/farmerRoutes");
const complainRoutes = require("./src/routes/complainRoutes");
const adminRouters = require("./src/routes/admin/adminRoutes");
const expensesRoutes = require("./src/routes/farmer/expensesRoutes");
const harvestRoutes = require("./src/routes/farmer/harvestRoutes");
const aichatRoutes = require("./src/routes/aichatRoutes");
const cookieParser = require("cookie-parser");

let app = express();

app.use(cookieParser());
// json from data
app.use(express.json());
// HTML from data accesses
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AgriTrack Backend is Running",
  });
});

// call routes
app.use("/web/agritrack/user", userRoutes);
app.use("/web/agritrack/farmer", farmerRoutes);
app.use("/web/agritrack/complain", complainRoutes);
app.use("/web/agritrack/admin", adminRouters);
app.use("/web/agritrack/farmer/expenses", expensesRoutes);
app.use("/web/agritrack/farmer/harvest", harvestRoutes);
app.use("/web/agritrack/aichat", aichatRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await dbConection();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
