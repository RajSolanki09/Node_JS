const express = require("express");
const dbConnection = require("./config/db");

const apiRoutes = require("./routes/index");
const cors = require("cors");
const isToken = require("./middleware/jwt-decode");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the Express");
});

app.use("/api/v1/", isToken, apiRoutes);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
  dbConnection();
});

// /api/v1/users