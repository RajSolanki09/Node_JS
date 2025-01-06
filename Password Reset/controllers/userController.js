const User = require("../model/userSchema");
const sendingMail = require("../services/mailService");

// pages
const getLoginPage = (req, res) => {
    res.render("login");
};
const getSignupPage = (req, res) => {
    res.render("signup");
};

const getIndexPage = (req, res) => {
    res.render("index");
}

const getResetPasswordPage = (req, res) => {
    res.render("resetPassword");
}

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let isExists = await User.findOne({ email: email });
        if (isExists) {
            return res.send("user already exists");
        } else {
            req.body.password = password; // No hashing
            let user = await User.create(req.body);
            return res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    let isExists = await User.findOne({ email: email });
    if (!isExists) {
        return res.send("user not found");
    }

    if (password !== isExists.password) {
        return res.send("invalid password");
    }
    res.cookie("username", isExists.username);
    res.cookie("userId", isExists.id);
    return res.send("logged in");
};


// send mail

const sendMail = async (req, res) => {
    const { to, subject, content } = req.body;
    await sendingMail(to, subject, content);
    res.send("mail to: " + to);
};

// otp send mail

let otps = new Map();

const sendOtp = async (req, res) => {
    const { email } = req.body;
    console.log(req.body, email);

    let isExists = await User.findOne({ email: email });
    if (!isExists) {
        return res.send("user not found");
    }
    try {
        let otp = Math.round(Math.random() * 1000000);
        otps.set(otp, email);
        console.log(otps);

        let html = `<h1>OTP : ${otp}</h1>`;
        await sendingMail(email, "password reset", html);
        res.redirect("/user/reset-password");
    } catch (error) {
        res.send(error.message);
    }
};

const verifyOtp = async (req, res) => {
    const { otp, password } = req.body;
    console.log(req.body);
    console.log(otps);

    let data = otps.get(Number(otp));
    console.log(data);
    if (!data) {
        res.send("Invalid OTP ");
    }
    let user = await User.findOne({ email: data });
    user.password = password;
    await user.save();
    res.send("password reset");
};

module.exports = { getLoginPage, getSignupPage, getIndexPage, getResetPasswordPage, createUser, login, sendMail, sendOtp, verifyOtp };