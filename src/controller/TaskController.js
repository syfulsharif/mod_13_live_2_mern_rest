const TaskModel = require("../model/TaskModel");
const UserModel = require("../model/UsersModel");

// Creat Task
exports.create = async (req, res) => {
    try {
        let reqBody = req.body;
        await TaskModel.create(reqBody);
        res.status(200).json({
            status: 'success', message: 'Task Created successfully.',
        })

    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}

// Read Task to complete
exports.getTasks = async (req, res) => {

    try {
        let email = req.headers['email'];
        let tasks = await TaskModel.find({email: email});
        res.status(200).json({
            status: 'success', data: tasks
        })
    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}


// Task Update
exports.taskUpdate = async (req, res) => {
    try {
        let taskID = req.params.taskId;
        let reqBody = req.body;
        let updatedTask = await TaskModel.updateOne({_id: taskID}, reqBody);
        res.status(200).json({status: 'task updated successfully', data: updatedTask});
    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}

// Task Delete
exports.taskDelete = async (req, res) => {
    try {
        let taskID = req.params.taskId;
        await TaskModel.deleteOne({_id: taskID});
        res.status(200).json({status: 'task deleted successfully'});
    } catch (e) {
        res.json({status: 400, message: e.message});
    }
}



