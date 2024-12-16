const {Router} = require("express");
const { addFood, getFood, updateFood } = require("../controller/food.controller");
const foodRouter = Router();


foodRouter.post("/foods", addFood);
foodRouter.get("/foods", getFood);
foodRouter.put("/foods/:id", updateFood);

module.exports = foodRouter;