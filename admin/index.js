const path = require("path");
const initializer = require("./middlewares/passportAuth");
const express = require("express");
const userRouter = require("./routes/user.route");
const connection = require("./config/db");
const Cookies = require("cookie-parser");
const { isLoggedIn } = require("./middlewares/isLogin");
const productRoute = require("./routes/product.route");
const passport = require('passport');
const session = require('express-session');
require("dotenv").config();
// Initialize Express
const app = express();
// Middleware Setup
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session & Passport Setup
app.use(session({ secret: "secret-key" }));
app.use(passport.initialize());
app.use(passport.session());
initializer(passport);
// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.get("/", isLoggedIn, (req, res) => {
  let { username } = req.cookies;
  res.render("index", { username });
});

app.use("/user", userRouter);
app.use("/products", productRoute);
// Server Startup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("listening on port on" + PORT);
  connection();
});
