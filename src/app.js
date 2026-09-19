const express = require("express");
const app = express();

app.use(express.json({ limit: "10kb" }));
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
  });
module.exports = app;