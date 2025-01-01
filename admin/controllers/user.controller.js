const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let isExists = await User.findOne({ email: email });
    if (isExists) {
      return res.send("users already Exists");
    } else {
      let hash = await bcrypt.hash(password, 10);
      req.body.password = hash;
      let user = await User.create(req.body);
      return res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error });
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

const getUserById = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId);
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndDelete(userId);
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let isExists = await User.findOne({ email: email });
  if (!isExists) {
    return res.send("user not found try again");
  }


  const isExisted = await bcrypt.compare(password, isExists.password)
  if (!isExisted) {
    return res.send("password is incorrect")
  }

  res.cookie("username", isExists.username);

  res.cookie("userId", isExists.id);

  return res.send("logged in success");
};

// pages
const getLoginPage = (req, res) => {
  res.render("login", {
    title: "login page",
  });
};
const getSignupPage = (req, res) => {
  res.render("signup");
};
// admin
const getAdmins = async (req, res) => {
  let admins = await User.find({ role: "admin", isVerified: false });
  res.status(200).json(admins);
};
// send mail

const sendMail = async (req, res) => {
  const { to, subject, content } = req.body;
  await sendingMail(to, subject, content);
  res.send("mail to: " + to);
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  getLoginPage,
  getSignupPage,
  login,
  getAdmins,
  sendMail,
}
