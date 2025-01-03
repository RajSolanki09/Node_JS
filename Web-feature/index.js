const express = require('express');
const connectDB = require('./config/db');
const path = require("path");
const app = express();
const port = 8090;
const Cookies = require("cookie-parser");
const userRouter = require('./routes/user.router');
const imgRouter = require('./routes/feature.router');
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json());
app.use(Cookies());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/images', (req, res) => {
    res.render('imgupload'); // Render the form
});
app.use("/user", userRouter);
app.use('/img', imgRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});