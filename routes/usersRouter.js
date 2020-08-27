const express = require('express');
const {validateBody,schemas} = require('../helpers/routeHelpers');
const {singup,singin,secret} = require('../controllers/usersController');

const passportConfig = require('../passport');
const passport = require('passport');

const userRouter = express.Router();

//cadastro
userRouter.post('/singup',validateBody(schemas.authSchema),singup);

//login
userRouter.post('/signin',validateBody(schemas.authSchema),passport.authenticate('local',{session:false}),singin);

//get
userRouter.get('/secret',passport.authenticate('jwt',{session:false}) ,secret);


module.exports = userRouter;