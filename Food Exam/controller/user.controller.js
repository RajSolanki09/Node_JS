const User = require("../model/user.model");

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const isExist = await User.findOne({ username });
    if (!isExist) {
        return res.status(401).json({ message: "User not found" });
    }
    if (isExist.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
    }
    res.cookie("UserName", isExist.username);
    res.status(200).json(isExist);
};


const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    const isExist = await User.findOne({ username });
    if (isExist) {
        return res.status(401).json({ message: "User already exists" });
    }
    const user = await User.create({ username, email, password });
    res.cookie("UserName", user.username);
    res.status(201).json(user);

};

const logoutUser = async (req, res) => {
    res.clearCookie("UserName");
    res.status(200).json({ message: "User logged out" });
};

module.exports = { loginUser, signupUser, logoutUser };
