const jwt = require('jsonwebtoken')

// Ensure that the secret key is defined
// const secretKey = process.env.JWT_SECRET || 'default_jwt_secret'

// function generateToken(user) {
//     if (!secretKey) {
//         throw new Error('JWT secret key must be defined')
//     }
//     return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' })
// }

const generateToken=(user)=>{
    return jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY)
}
module.exports = {generateToken}