const Food = require("../models/food.model");

exports.create = async (req, res) => {
  req.body.userId = req.user.id;
  let food = await Food.create(req.body);
  res.send(food);
};