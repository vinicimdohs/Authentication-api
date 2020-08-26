//dependences
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//routes require
const userRouter = require('./routes/usersRouter');

dotenv.config();
const app = express();

//Middleware
app.use(morgan(`dev`));
app.use(bodyParser.json());
//Routes
app.use('/users',userRouter);
//Start the server

const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})