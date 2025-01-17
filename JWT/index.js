const express = require("express");
const dbConnection = require("./config/db");
const userRoutes = require("./routes/user.route");
const foodRoutes = require("./routes/food");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Express");
});

// /api/v1/users

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/food", foodRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
  dbConnection();
});
