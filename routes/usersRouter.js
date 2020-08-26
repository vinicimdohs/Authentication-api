const express = require('express');
const userRouter = express.Router();
const {singup,singin,secret} = require('../controllers/usersController');

userRouter.post('/singup',singup);

userRouter.post('/signin',singin);

userRouter.get('/secret',secret);


module.exports = userRouter;