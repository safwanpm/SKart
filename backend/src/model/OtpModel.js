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
    status:{
        type:String
    }
    
    
})

const OtpModel = mongoose.model('TempTb', registerSchema)
module.exports = OtpModel
