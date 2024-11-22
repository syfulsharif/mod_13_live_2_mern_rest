const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobileNumber: {type: Number, required: true},
    password: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;