const User = require("../model/userSchema");

const getLoginPage = (req, res) => {
    res.render("login", {
        title: "login page",
    });
};

const getSignUpPage = (req, res) => {
    res.render("signup");
};

const createUser = async (req, res) => {
    try {
      const { email } = req.body;
      let isExists = await User.findOne({ email: email });
      if (isExists) {
        return res.send("users already Exists");
      } else {
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
    if (isExists.password != password) {
      return res.send("invalid password");
    }
  
    res.cookie("username", isExists.username);
    res.cookie("userId", isExists.id);
    return res.send("logged in");
  };

  const getUser = async (req, res) => {
    try {
      let users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

module.exports = { getLoginPage, getSignUpPage, createUser, login, getUser };
