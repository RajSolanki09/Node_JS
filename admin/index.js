const express = require("express");
const path = require("path");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const Cookies = require("cookie-parser");
const { isLoggedIn } = require("./middlewares/isLogin");
const productRoute = require("./routes/product.route");
require("dotenv").config();
const app = express();
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", isLoggedIn, (req, res) => {
  let { username } = req.cookies;
  res.render("index", { username });
});
app.use("/user", userRouter);
app.use("/products", productRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("listening on port on" + PORT);
  connection();
});
