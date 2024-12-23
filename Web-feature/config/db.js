const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/app-feature");
  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
