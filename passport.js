const passport = require('passport');
require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');

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
//Google o auth strategy

passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID:'1042306581744-2rht3pqg8kkgcaq95hkqnhhdhc8poemd.apps.googleusercontent.com',
    clientSecret: 'Vg0la6chv-02LHc97razEQ_x'
}, async(accesToken,refreshToken,profile,done)=>{
    try{
        console.log('accesToken :',accesToken);
        console.log('refreshToken :',refreshToken);
        console.log('profile :',profile);

        //check this user existis
        const existingUser = await User.findOne({"google.id":profile.id});
        if(existingUser){
            return done(null,existingUser);
        }

        //if new account
        const newUser = new User({
            method:'google',
            google:{
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null,newUser);

    }catch(e){
        done(e,false,e.message);
    }
    

}));


//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
},async (email,password,done)=>{
    try{
        //find the user given the email
        const user = await User.findOne({"local.email":email});
        console.log('email :',email);
        //if not, handle it
        if(!user){
            return done(null,false);
        }
        //check if the password is correct
        const isMatch = await user.isValidPassword(password);
        //if not,handle it
        if(!isMatch){
            return done(null,false);
        }
        //return user
        done(null,user);

    }catch(e){
        done(e,false);
    }
    

}));


