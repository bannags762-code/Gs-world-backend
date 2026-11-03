require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Basic security and middleware
app.disable("x-powered-by");

app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));

app.use(express.json({ limit: "1mb" }));

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "GS WORLD",
    tagline: "Discover the Unknown.",
    message: "GS WORLD Backend is running!"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "online",
    service: "GS WORLD Backend"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`GS WORLD Backend running on port ${PORT}`);
});
