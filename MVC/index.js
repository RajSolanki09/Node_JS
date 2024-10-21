const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.rout");
const app = express()

app.use(express.json())
app.use("/user", userRouter)
app.use("/product",productRouter)
    
app.listen(8090, () => {
    console.log(`Server is running on port 8090`);
    dbConnect()
})