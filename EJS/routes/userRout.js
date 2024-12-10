const {Router}=require("express")
const { getIndex } = require("../controller/user.controller")

const userRouter=Router()

userRouter.get('/',getIndex)
module.exports=userRouter;