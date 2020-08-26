const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create a schema
const userSchema = new Schema({
    email: {
        type:String,
        required:true,
        unique: true,
        lowercase: true
    },
    password: {
        type:String,
        required:true
    },
});

//model
const User = mongoose.model('users',userSchema)
//export model
module.exports = User;