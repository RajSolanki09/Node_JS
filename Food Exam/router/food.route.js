const { Router } = require("express");
const { addFood, getFood, updateFood, addFoodPage } = require("../controller/food.controller");
const { checkRole } = require("../middlewere/userMiddleware");
const foodRouter = Router();

foodRouter.get("/addfood", addFoodPage);
foodRouter.post("/addfood", checkRole, addFood);
foodRouter.get("/foods", getFood);
foodRouter.put("/foods/:id", checkRole, updateFood);

module.exports = foodRouter;