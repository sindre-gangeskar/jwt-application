var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            const error = res.status(401);
            error.statusText = 'Unauthorized';
            res.status(401).json({ status: error.statusCode, message: error.statusText });
            return;
        }

        const token = authHeader.split(' ')[ 1 ];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        res.status(200).json({
            success: true,
            data: {
                userId: decodedToken.userId,
                email: decodedToken.email,
                users: await userService.getAll()
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error! Something went wrong." });
    }

});

module.exports = router;