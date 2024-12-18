const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    email: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;