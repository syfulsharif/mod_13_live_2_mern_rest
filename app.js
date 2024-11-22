const express = require('express');
const app = new express();
const router = require('./src/route/api');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');

// Cors Open
app.use(cors());

// Security Implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({extended: true}));


const limiter = rateLimiter({windowMs: 15 * 60 * 1000, max: 3000});

// Database Connection
let URL = "mongodb://localhost:27017/taskmern5";
let OPTIONS = {user: "", pass: "", autoIndex: true};
// mongoose.connect(URL, OPTIONS, (err) => {
//     if (!err) {
//         console.log("MongoDB Connected");
//     } else {
//         throw err;
//     }
// })

mongoose.connect(URL, OPTIONS).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});

// Route Implementation
app.use("/api", router);
app.use("*", (req, res) => {
    res.status(404).json({data: "Not Found"});
})

module.exports = app;