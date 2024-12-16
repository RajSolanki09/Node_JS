const User = require("../models/user.schema");

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.create({ username, password, email });
  res.status(201).json(user);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  res.status(200).json({ message: "Logged in successfully" });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

module.exports = { signup, login, deleteUser, getAllUsers };