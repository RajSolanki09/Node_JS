const { Router } = require("express");
const foodController=require("../controller/food");
const isToken = require("../middleware/jwt-decode");

const routes = Router();
routes.post("/create",isToken,foodController.create)

module.exports = routes;
