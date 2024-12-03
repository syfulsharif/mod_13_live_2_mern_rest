const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token'];

    jwt.verify(token, "sharif", (err, decodedData) => {
        if (err) {
            res.status(401).json({
                stash: "unauthorized",
            })
        } else {
            req.headers.email= decodedData["data"];
            // console.log(decodedData["data"]);
            next();
        }
    })
}