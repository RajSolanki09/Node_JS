const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const Cookie = require("cookie-parser");
const userRouter = require("./router/user.route");
const foodRouter = require("./router/food.route");
app.use(express.json());
app.use(Cookie());

//ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));


app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signUp");
});

app.get("/addFood", (req, res) => {
  res.render("addFood");
});

app.use("/api", userRouter);
app.use("/api", foodRouter);


app.listen(8090, () => {
  console.log("Server is running on port 8090");
  connectDB();
});
