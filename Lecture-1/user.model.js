const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    userName:String,
    email:String,
    password:String
})

const User = mongoose.model('user',userSchema)

module.exports=User