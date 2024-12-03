const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const TaskController = require('../controller/TaskController');

router.post('/register', UserController.register);

router.post('/login', UserController.login);
router.get('/verifyEmail/:email', UserController.verifyEmail);
router.get('/verifyOTP/:email/:otp', UserController.verifyOTP);
router.get('/passwordReset/:email/:otp/:password', UserController.passwordReset);


// After Login
router.get('/profile', AuthMiddleware, UserController.profileDetails);
router.put('/profileUpdate', AuthMiddleware, UserController.profileUpdate);

// Task Manager API
// Task Create, Task Update, Task Delete, Task Read
router.post('/task/create', AuthMiddleware,  TaskController.create);
router.get('/task/tasks', AuthMiddleware, TaskController.getTasks);
router.put('/task/updateTask/:taskId', AuthMiddleware, TaskController.taskUpdate);
router.delete('/task/deleteTask/:taskId', AuthMiddleware, TaskController.taskDelete);


module.exports = router;
