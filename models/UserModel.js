const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { string } = require('joi');
const Schema = mongoose.Schema;


//create a schema
const userSchema = new Schema({
    method:{
        type:String,
        enum:['local','google','facebook'],
        required:true
    },
    local:{
        email: {
            type:String,
            lowercase: true
        },
        password: {
            type:String,         
        },
    },
    google:{
        id:{
            type:String,
        },
        email:{
            type:String,
            lowercase: true
        }
    },
    facebook:{
        id:{
            type:String,
        },
        email:{
            type:String,
            lowercase: true
        }
    },
    
});

userSchema.pre('save',async function(next){
    try{
        if(this.method !== 'local'){
            next();
        }
        //Generate salt
        const salt = await bcrypt.genSalt(10);
        //hash+salt
        const passwordHash = await bcrypt.hash(this.local.password,salt);
        //sobrepondo o pass
        this.local.password = passwordHash;
        
        next();

    }catch(e){
        next(e);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try{
        return await bcrypt.compare(newPassword,this.local.password);
    }catch(e){
        throw new Error(e)
    }
}

//model
const User = mongoose.model('users',userSchema)
//export model
module.exports = User;