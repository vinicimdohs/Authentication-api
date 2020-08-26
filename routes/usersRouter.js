const express = require('express');
const {validateBody,schemas} = require('../helpers/routeHelpers');
const {singup,singin,secret} = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.post('/singup',validateBody(schemas.authSchema),singup);

userRouter.post('/signin',singin);

userRouter.get('/secret',secret);


module.exports = userRouter;