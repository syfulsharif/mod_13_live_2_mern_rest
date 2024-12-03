const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    status: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const OTPModel = mongoose.model('otps', OTPSchema);

module.exports = OTPModel;