const express = require('express');
const {validateBody,schemas} = require('../helpers/routeHelpers');
const {singup,singin,secret} = require('../controllers/usersController');

const passportConfig = require('../passport');
const passport = require('passport');

const userRouter = express.Router();

userRouter.post('/singup',validateBody(schemas.authSchema),singup);

userRouter.post('/signin',singin);

userRouter.get('/secret',passport.authenticate('jwt',{session:false}) ,secret);


module.exports = userRouter;