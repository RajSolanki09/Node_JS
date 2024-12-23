const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cookieparser = require("cookie-parser");
const DataBaseConnect = require("./config/db");
const UserRouter = require("./Routes/user.routes");
const BlogRouter = require("./Routes/blog.routes");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8090;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user", UserRouter);
app.use("/blog", BlogRouter);

app.get("/", (req, res) => {
  res.render("index", { message: "Hello from Blog API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  DataBaseConnect();
});
