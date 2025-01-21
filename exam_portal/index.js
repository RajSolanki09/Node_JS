const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const examRoutes = require("./routes/exam.routes");
const questionRoutes = require("./routes/question.routes");
const resultRoutes = require("./routes/result.routes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});