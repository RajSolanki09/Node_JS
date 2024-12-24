const isLoggedIn = (req, res, next) => {
  let { username, userId } = req.cookies;
  if (req.user) {
    next();
  } else {
    res.redirect("/user/login");
  }
};

module.exports = { isLoggedIn };
