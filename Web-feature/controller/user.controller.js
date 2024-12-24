const bcrypt = require("bcrypt");
const User = require("../modele/user.schema");

const loginPage = async (req, res) => {
    res.render("login.ejs");
};

const signupPage = async (req, res) => {
    res.render("signup.ejs");
};

const addToPlaylist = async (req, res) => {
    res.render("addtoplaylist.ejs");
};
const createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        let isExists = await User.findOne({ email: email });
        if (isExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        let hash = await bcrypt.hash(password, 10);
        req.body.password = hash;

        await User.create(req.body);

        return res.status(200).json({ message: "Account created successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let isExists = await User.findOne({ email: email });
        if (!isExists) {
            return res.status(404).send("User not found");
        }

        const isMatched = await bcrypt.compare(password, isExists.password);
        if (!isMatched) {
            return res.status(401).send("Invalid password");
        }

        res.cookie("username", isExists.name);
        res.cookie("userId", isExists._id);
        return res.send("Logged in successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = { login, createUser, getUser, loginPage, signupPage, addToPlaylist };
