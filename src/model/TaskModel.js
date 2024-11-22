const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;