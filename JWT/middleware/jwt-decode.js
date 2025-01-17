const jwt = require("jsonwebtoken");
require("dotenv").config();
const isToken = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send({ msg: "token is required" });
  }

  try {
    let decode = await jwt.verify(token, process.env.jwt_secret);
    req.user=decode
    next();
  } catch (error) {
    res.status(500).send({ msg: "error verifying token " });
  }
};

module.exports = isToken;