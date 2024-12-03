const UserModel = require('../model/UsersModel');
const jwt = require('jsonwebtoken');
const SendEmailUtility = require("../../utility/SendEmailUtility");
const OTPModel = require("../model/OTPModel");

exports.register = async (req, res) => {
    try {
        let reqBody = req.body;
        await UserModel.create(reqBody);
        res.status(200).json({
            status: 'success', message: 'User registered successfully.',
        })

    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}


exports.login = async (req, res) => {
    try {
        let user = await UserModel.findOne({email: req.body["email"], password: req.body["password"]});
        if (!user) {
            res.status(401).json({message: 'User does not exist'});
        } else {
            // JWT Token
            let reqBody = req.body;
            let Payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: reqBody["email"]};
            let token = jwt.sign(Payload, "sharif");
            res.json({status: "success", message: "User Found", token: token});
        }
    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}


exports.profileDetails = async (req, res) => {

    try {
        let email = req.headers['email'];
        let userProfile = await UserModel.findOne({email: email})
        res.status(200).json({
            status: 'success', data: userProfile
        })
    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}


exports.profileUpdate = async (req, res) => {
    try {
        let email = req.headers['email'];
        let reqBody = req.body;
        let updatedUserProfileData = await UserModel.updateOne({email: email}, reqBody);
        res.status(200).json({status: 'profile updated successfully', data: updatedUserProfileData});
    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}


exports.verifyEmail = async (req, res) => {
    try {
        let {email} = req.params;
        let user = await UserModel.findOne({email: email})
        // console.log(user);
        if (!user) {
            res.status(401).json({message: 'User does not exist'});
        } else {
            // Send Email
            let OTP = Math.floor(100000 + Math.random() * 900000);
            await SendEmailUtility(email, `Your OTP=${OTP}`, "MERN TASK MANAGER CODE");
            await OTPModel.create({email: email, otp: OTP, status: 'active'});
            res.status(200).json({status: 'success', message: 'verification code sent to your email'});
        }
    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        let {email, otp} = req.params;
        let user = await OTPModel.findOne({email: email, otp: otp, status: 'active'});
        if (!user) {
            res.status(401).json({message: 'OTP verification failed'});
        } else {
            await OTPModel.updateOne({email: email, otp: otp}, {status: 'verified'});
            res.status(200).json({status: 'success', message: 'OTP verified successfully'});
        }
    } catch (e) {
        res.status(400, e.message);
    }
}

exports.passwordReset = async (req, res) => {
    try {
        let {email, otp, password} = req.params;
        let user = await OTPModel.findOne({email: email, otp: otp, status: 'verified'});
        console.log(user);
        if (!user) {
            res.status(401).json({message: 'invalid request'});
        } else {
            await OTPModel.deleteOne({email: email, otp: otp});
            await UserModel.updateOne({email: email}, {password: password});
            res.status(200).json({status: 'success', message: 'password reset successfully'});
        }
    } catch (e) {
        res.status(400, e.message);
    }
}