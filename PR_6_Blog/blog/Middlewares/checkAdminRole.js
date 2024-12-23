const checkNotAdmin = (req, res, next) => {
  const userRole = req.cookies.role;

  if (userRole === "admin") {
    return res.status(403).send("Admins cannot perform this action");
  }
  next();
};

module.exports = checkNotAdmin;
