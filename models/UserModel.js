const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create a schema
const userSchema = new Schema({
    email: String,
    password: String
});

//model
const User = mongoose.model('users',userSchema)
//export model
module.exports = User;