const User = require("../Models/user.schema");

const loginPage = (req, res) => res.render("login");
const signupPage = (req, res) => res.render("signup");

const signup = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.send(`${user.username}`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });
    await user.save();
    res.send(`Account created successfully ${user.username}`);
  } catch (err) {
    res.status(500).send("Error creating user");
  }
};

const login = async () => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.send("Invalid Credentials.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid Credentials.");

    // res.cookie("role", user.role);
    // res.cookie("id", user._id);
    // res.send(`Welcome User ${user.username}`);
    res
      .cookie("role", user.role)
      .cookie("id", user._id)
      .cookie("username", user.username)
      .send(`Welcome User ${user.username}`);
  } catch (err) {
    res.status(500).send("Error logging in");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    res.send(`user deleted ${user.username}`);
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  loginPage,
  signupPage,
  signup,
  login,
  deleteUser,
};
