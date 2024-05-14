const express = require('express')
const RegisterRouter = express.Router();
require('dotenv').config()
const nodemailer = require('nodemailer');
const RegisterModel = require('../model/RegisterModel');
var bcrypt = require('bcryptjs');
const OtpModel = require('../model/OtpModel');

// Set up nodemailer transporter with Gmail SMTP
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "sportkart2@gmail.com", // Replace with your Gmail address
        pass: "zjza jxhq joax tara"  // Replace with your Gmail password
    }
});


// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// RegisterRouter.post('/send', async (req, res) => {
//     console.log('Sending OTP');
//     console.log(req.body);
//     const  {name,email,phone,password} = req.body;
//     const hashedPass = await bcrypt.hash(password, 12)
//     console.log(); // Replace with the recipient's email address
//     const otp = generateOTP()
//     const details={
//         name:name,
//         email:email,
//         otp:otp,
//         phone:phone,
//         password:hashedPass
//     }

//     const storedOtp = await OtpModel(details).save()
//     let mailOptions = {
//         from: "sportkart2@gmail.com", // Sender's email address
//         to: email,
//         subject: "OTP for registration",
//         html: `<h3>OTP for account verification is:</h3><h1 style='font-weight:bold;'>${otp}</h1>`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             res.status(500).json({
//                 success: false,
//                 error: true,
//                 message: "Error sending mail"
//             })
//         } else {
//             console.log('OTP sent:', otp);
//             res.status(200).json({
//                 success: true,
//                 error: false,
//                 data:details,
//                 message: "Otp sent Successfully"
//             })
//         }
//     });
// });
RegisterRouter.post('/send', async (req, res) => {
    console.log('Sending OTP');
    console.log(req.body);
    const { name, email, phone, password } = req.body;

    try {
        // Check if email already exists in the database
        const existingUser = await RegisterModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Email already exists"
            });
        }

        // If email doesn't exist, proceed with OTP generation and sending
        const hashedPass = await bcrypt.hash(password, 12);
        console.log(); // Replace with the recipient's email address
        const otp = generateOTP();
        const details = {
            name: name,
            email: email,
            otp: otp,
            phone: phone,
            password: hashedPass
        };

        // Save OTP details to the database
        const storedOtp = await OtpModel(details).save();

        let mailOptions = {
            from: "sportkart2@gmail.com", // Sender's email address
            to: email,
            subject: "OTP for registration",
            html: `<h3>OTP for account verification is:</h3><h1 style='font-weight:bold;'>${otp}</h1>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({
                    success: false,
                    error: true,
                    message: "Error sending mail"
                });
            } else {
                console.log('OTP sent:', otp);
                res.status(200).json({
                    success: true,
                    error: false,
                    data: storedOtp,
                    message: "OTP sent successfully"
                });
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
});





RegisterRouter.post('/verify', async (req, res) => {
    try {
        const { name, email, phone, password, otp, } = req.body;

        // Check if OTP exists
        console.log(otp, 'abcd');
        const checkOTP = await OtpModel.findOne({ otp: otp });
        if (!checkOTP) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid OTP"
            });
        }

        // Delete OTP after verification
        await OtpModel.findOneAndDelete({ email: email });

        // Save registration details
        const userDetails = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            status: null,
            role:1,
            cart:null,
            wishlist:null,
            typelogin:'normal'

        };
        const registerData = await RegisterModel(userDetails).save();

        console.log(registerData);

        return res.status(200).json({
            success: true,
            error: false,
            data: registerData,
            message: "Registration Success",
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
});

RegisterRouter.post('/view-details', async (req, res) => {
    try {
        const email = req.body.email;
        console.log(req.body, 'aaa');
        console.log(email, 'abc');
        const Details = await OtpModel.findOne({ email: email })
        console.log(Details);
        if (Details) {
            return res.status(200).json({
                data: Details,

            })
        }
    }
    catch (err) {
        return res.status(400).json({
            message: "Not found",

        })
    }
})

RegisterRouter.post('/forgot', async (req, res) => {
    console.log('Sending OTP');
    console.log(req.body);
    const { name, email, phone, status } = req.body;

    try {
        // Check if email already exists in the database
        const existingUser = await RegisterModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Email not Registered"
            });
        }

        // If email doesn't exist, proceed with OTP generation and sending

        const otp = generateOTP();
        const details = {
            email: email,
            otp: otp,
            status: 'change'
        };

        // Save OTP details to the database
        const storedOtp = await OtpModel(details).save();

        let mailOptions = {
            from: "sportkart2@gmail.com", // Sender's email address
            to: email,
            subject: "OTP for Forgot passsword",
            html: `<h3>OTP for account verification is:</h3><h1 style='font-weight:bold;'>${otp}</h1>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({
                    success: false,
                    error: true,
                    message: "Error sending mail"
                });
            } else {
                console.log('OTP sent:', otp);
                res.status(200).json({
                    success: true,
                    error: false,
                    data: details,
                    message: "OTP sent successfully"
                });
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
});
RegisterRouter.post('/verify-forgot', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if OTP exists
        const checkOTP = await OtpModel.findOne({ email: email, otp: otp });
        if (!checkOTP) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid OTP"
            });
        }
        if (checkOTP) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "OTP verified successfully",
            });
        }

        // Delete OTP after verification
        await OtpModel.findOneAndDelete({ email: email });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
});

RegisterRouter.put('/changepassword', async (req, res) => {
    try {
        
        const { password, email } = req.body;
        const hashedPass = await bcrypt.hash(password, 12);
        const details = await RegisterModel.findOneAndUpdate({ email: email },
            {
                password: hashedPass
            })
        if (details) {
            res.status(200).json({
                success: true,
                error: false,
                data: details,
                message: "Password Upadated"
            })
        }

    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: true,
            message: "Can't Update catch error"
        })
    }
})

RegisterRouter.post('/glogin', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email } = req.body;

        const userDetails = {
            name: name,
            email: email,
            status: null,
            wishlist: null,
            cart: null,
            password: null,
            typelogin: 'google',
            role: 1

        };
        const checkMail = await RegisterModel.findOne({ email: email });
        if (checkMail) {
            return res.status(200).json({
                success: true,
                error: false,
                data: checkMail,
                message: "Success",
            });
        }
        if (!checkMail) {
            const registerData = await RegisterModel(userDetails).save();
            return res.status(200).json({
                success: true,
                error: false,
                data: registerData,
                message: "Registration Success",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
});
RegisterRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        
         
        const user = await RegisterModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "user not found"
            })
        }
        const encrypt = await bcrypt.compare(password, user.password)
        if (encrypt == true) {
            if (user.role == 0) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    role: user.role,
                    email: email,
                    message: " Admin Login successfully"
                })
            }
            if (user.role == 1) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    role: user.role,
                    message: " User Login successfully",
                    
                })
            }


        }

        if (encrypt == false) {
            return res.status(400).json({
                success: true,
                error: false,
                message: "Check Password..!"
            })
        }


    }
    catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "can't login"
        })
    }
})


module.exports = RegisterRouter