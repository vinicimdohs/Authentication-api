const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.pre('save',async function(next){
    try{
        //Generate salt
        const salt = await bcrypt.genSalt(10);
        //hash+salt
        const passwordHash = await bcrypt.hash(this.password,salt);
        //sobrepondo o pass
        this.password = passwordHash;
        next();

    }catch(e){
        next(e);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try{
        return await bcrypt.compare(newPassword,this.password);
    }catch(e){
        throw new Error(e)
    }
}

//model
const User = mongoose.model('users',userSchema)
//export model
module.exports = User;