require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConection = require("./src/config/db");

// Routes
const userRoutes = require("./src/routes/userRoutes");
const farmerRoutes = require("./src/routes/farmer/farmerRoutes");
const complainRoutes = require("./src/routes/complainRoutes");
const adminRouters = require("./src/routes/admin/adminRoutes");
const expensesRoutes = require("./src/routes/farmer/expensesRoutes");
const harvestRoutes = require("./src/routes/farmer/harvestRoutes");
const aichatRoutes = require("./src/routes/aichatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.set("bufferCommands", false);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  }),
);

// Basic health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AgriTrack Backend is running",
  });
});

// Database readiness check
app.get("/ready", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.status(200).json({
      success: true,
      database: "connected",
    });
  }

  res.status(503).json({
    success: false,
    database: "disconnected",
  });
});

// Routes
app.use("/web/agritrack/user", userRoutes);
app.use("/web/agritrack/farmer", farmerRoutes);
app.use("/web/agritrack/complain", complainRoutes);
app.use("/web/agritrack/admin", adminRouters);
app.use("/web/agritrack/farmer/expenses", expensesRoutes);
app.use("/web/agritrack/farmer/harvest", harvestRoutes);
app.use("/web/agritrack/aichat", aichatRoutes);

// Database connection retry
const connectDatabase = async () => {
  while (mongoose.connection.readyState !== 1) {
    try {
      await dbConection();
      console.log("MongoDB connected successfully.");
      break;
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      console.log("Retrying database connection in 5 seconds...");

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

// Database events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected.");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected.");
});

// Start server first
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);

  connectDatabase();
});
