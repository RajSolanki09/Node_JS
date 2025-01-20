const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register User (Admin, Teacher, or Student)
const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  // Check if user already exists
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create and save the user
  const newUser = new User({
    email,
    password: hashedPassword,
    role: role || 'student', // Default to 'student' if no role is provided
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ message: 'Login successful', token });
};

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check user roles
const isAuthorized = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission' });
    }
    next();
  };
};

module.exports = {
  registerUser,
  loginUser,
  isAuthenticated,
  isAuthorized,
};
