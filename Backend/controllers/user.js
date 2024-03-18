const bcrypt = require('bcrypt');
// const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// require('dotenv').config();
JWT_SECRET = 'mySecretKeyForJWTs@2024'
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
// const app = express();
const verifyEmail = async (email) => {
    const otp = generateOTP();
    // These id's and secrets should come from .env file.
    const CLIENT_ID = '140083932391-4846kjcp9bhv4ctbfto324cr4d8tnv53.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04XsPXW5BR2k5CgYIARAAGAQSNwF-L9IrhuWB69JvrQpDbX60y4OBD3nUibEfRw9_CR2EuuoMuRcjNTdfwIvJp3SK3rV_N_Am6Qg';

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'gautamdtua42003@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'Metube <gautamdtua42003@gmail.com>',
            to: email,
            subject: `[Metube] Your one time password-${otp}`,
            text: `Your one time password is ${otp}`,
            html: `Your one time password is <b>${otp}</b>`,
        };

        const result = await transport.sendMail(mailOptions);
        console.log('Email sent...', result);
        return { success: true,otp };
    } catch (error) {
        console.error('Email error:', error.message);
        return { success: false, error: error.message };
    }
};
const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists.' });
        
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match' });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });
        
        const authToken = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ message: 'User created successfully', token: authToken });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({ message: error.message });
    }
};




const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });
        
        const authToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });
        
        res.status(200).json({ result: existingUser, token: authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};



module.exports = {
    signin,
    signup,
    verifyEmail,
};
// const verifyOtp = async (email) => {
//     try {
//         const emailVerificationResult = await verifyEmail(email);

//         if (!emailVerificationResult.success) {
//             console.error('Email error:', emailVerificationResult.error);
//             throw new Error('Failed to send OTP email');
//         }

//         return { otp: emailVerificationResult.otp };
//     } catch (error) {
//         console.error('OTP verification error:', error.message);
//         throw new Error('Invalid OTP');
//     }
// };
