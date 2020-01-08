const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User=require('../Models/User-Model')
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: "User unauthorized" });
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            //ADd user from payload
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({ msg: "Token is invalid" })

        }

    }
}

module.exports = auth;