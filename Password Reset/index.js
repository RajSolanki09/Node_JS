const express = require('express');
const Cookies = require("cookie-parser");
const connectDB = require('./config/db');
const path = require("path");
const userRouter = require('./router/user.router');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// Middleware Setup
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(8090, () => {
    console.log("Server is running on port 8090");
    connectDB();
});
