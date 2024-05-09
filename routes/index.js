require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
})

router.get('/login', function (req, res, next) {
  res.render('login');
})

router.post('/login', async function (req, res, next) {
  try {
    let existingUser = await userService.getOnebyName(req.body.username);
    let token;

    if (existingUser && req.body.password === existingUser.password) {
      token = jwt.sign({
        id: existingUser.id, email: existingUser.username
      }, process.env.TOKEN_SECRET, { expiresIn: '1hr' });

      res.status(200).json({
        success: true,
        data: {
          id: existingUser.id,
          email: existingUser.username,
          token: token
        }
      });

    }
    else res.status(403).json({
      success: false,
      message: 'Login data invalid, please try again'
    })
  } catch {
    const error = new Error('Error! Something went wrong!');
    return next(error);
  }
})

router.post('/signup', async function (req, res, next) {

  try {
    await userService.create(req.body.username, req.body.password);
    const createdUser = await userService.getOnebyName(req.body.username);
    const token = jwt.sign({ id: createdUser.id, email: createdUser.username }, process.env.TOKEN_SECRET, { expiresIn: '1hr' });

    if (createdUser) {
      res.status(201).json({
        success: true,
        data: {
          id: createdUser.id,
          email: createdUser.username,
          token: token
        }
      });
    }

    else res.status(400).json({
      success: false,
      message: 'Something went wrong'
    })
  } catch (error) {
    console.log(error);
    return next(error);
  }

 
});


module.exports = router;
