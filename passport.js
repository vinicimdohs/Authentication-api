const passport = require('passport');
require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/UserModel');

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.TOKEN_SECRET,
},async(payload,done)=>{
    try{
        //find the users specified in token
        const user = await User.findById(payload.sub);//payload.sub contém o id
        //if user doesn't exists,handle it
        if(!user){
            return done(null,false);
        }
        //Otherwise , return user
        done(null,user);

    }catch(e){
        done(e,false);
    }
}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
},async (email,password,done)=>{
    //find the user given the email
    const user = await User.findOne({email});
    //if not, handle it
    if(!user)return done(null,false);
    //check if the password is correct

    //if not,handle it


    //return user

}));


