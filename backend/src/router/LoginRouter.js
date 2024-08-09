const express = require('express')
const LoginRouter = express.Router();
require('dotenv').config()
const nodemailer = require('nodemailer');
const RegisterModel = require('../model/RegisterModel');
var bcrypt = require('bcryptjs');
const OtpModel = require('../model/OtpModel');
const jwt =require('jsonwebtoken');
const CheckAuth = require('../middleware/CheckAuth');


LoginRouter.get('/verify', CheckAuth, async(req,res)=>{
    const data = req.user
    return res.status(200).json({
        success:true,
        message:"autherized",
        data:data
    })

})

module.exports= LoginRouter