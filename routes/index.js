require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const users = [];
let id = 1;

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
  let { email, password } = req.body;
  let existingUser;

  let token;

  try {
    token = jwt.sign({
      userId: existingUser.id, email: existingUser.email
    }, process.env.TOKEN_SECRET, { expiresIn: '1hr' });

    existingUser = users.find(element => element.email === email);
  } catch {
    const error = new Error('Error! Soemthing went wrong!');
    return next(error);
  }

  if (!existingUser || existingUser.password != password) {
    const error = new Error('Wrong details, please check at once');
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token
    }
  });

})

router.post('/signup', async function (req, res, next) {
  const { email, password } = req.body;
  const newUser = {
    id,
    email,
    password
  };

  users.push(newUser);
  id++;

  let token;

  try {
    token = jwt.sign({ userId: newUser.id, email: newUser.email, token: token }, process.env.TOKEN_SECRET, { expiresIn: '1hr' });
  } catch (err) {
    console.log(err);
    const error = new Error('Something went wrong');
    return next(error);
  }

  res.status(201).json({
    success: true,
    data: {
      userId: newUser.id,
      email: newUser.email,
      token: token
    }
  });
})

module.exports = router;
