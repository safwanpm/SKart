const mongoose = require('mongoose')
const connectionString = process.env.connectionString
mongoose.connect(connectionString)
const Schema = mongoose.Schema
require('dotenv').config
const registerSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    otp: {
        type: String,
    },
    status: {
        type: String
    },
    role: {
        type: Number
    },
    wishlist: {
        type: String
    }, 
    cart: {
        type: String
    },
     typelogin: {
        type: String
    }
})

const   RegisterModel = mongoose.model('RegisterTb', registerSchema)
module.exports = RegisterModel
