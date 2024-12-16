const { Router } = require("express");
const { addFood, getFood, updateFood } = require("../controller/food.controller");
const { checkRole } = require("../middlewere/userMiddleware");
const foodRouter = Router();


foodRouter.post("/foods", checkRole, addFood);
foodRouter.get("/foods", getFood);
foodRouter.put("/foods/:id", checkRole, updateFood);

module.exports = foodRouter;