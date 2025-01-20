const jwt = require('jsonwebtoken');

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

module.exports = { isAuthenticated, isAuthorized };
