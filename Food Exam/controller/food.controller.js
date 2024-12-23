const Food = require("../model/food.model");

const addFood = async (req, res) => {
    const userId = req.cookies.userId;
    const food = await Food.create({ ...req.body, userId });
    res.status(201).json(food);

};

const getFood = async (req, res) => {
    const userId = req.cookies.userId;
    const food = await Food.find({ userId });
    res.status(200).json(food);
};

const updateFood = async (req, res) => {
    const userId = req.cookies.userId;
    const food = await Food.findByIdAndUpdate(req.params.id, { ...req.body, userId });
    res.status(200).json(food);
};  
const addFoodPage = async (req, res) => {
    res.render("addFood");
};

module.exports = { addFood, getFood, updateFood , addFoodPage};
