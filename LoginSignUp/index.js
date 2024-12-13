const express = require('express');
const connectDB = require('./config/db');
const path = require("path");
const app = express();
const port = 8090;
const Cookies = require("cookie-parser");
const userRouter = require('./Router/userRouter');
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

app.post('/signup', (req, res) => {
    const { name, email, img } = req.body;

    res.render('userInformation', { user: { name, email, img } });
});

// app.get('/userInformation', (req, res) => {
//     res.render('userInformation'); 
// });

app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
