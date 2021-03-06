const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

signToken = (user) => {
    return jwt.sign({
        iss:'ViniciusF',
        sub: user.id,
        iat: new Date().getTime(),//current
        exp: new Date().setDate(new Date().getDate() + 1)//current + 1day
    },process.env.TOKEN_SECRET);
}

module.exports = {
    singup: async(req,res,next)=>{
        try{
            //email and pass          
            const {email,password} = req.value.body;
            
            //if there is a user whith the same email
            const foundUser = await User.findOne({'local.email': email});
            
            if(foundUser){
                return res.status(403).send({error: 'Email existente'});
            }
            
            console.log('email :',email,'senha :',password);
            //create a new user
            const newUser = new User({ 
                method :'local',
                local:{
                    email:email,
                    password:password
                }
            });
            console.log('new user:',newUser);
            
             const newa = await newUser.save();
             
            //responder com o token
            const token = signToken(newUser);
            res.status(200).json({token});

        }catch(e){
            res.status(500).send(e);
        }
    },singin: async(req,res,next)=>{
        try{
            //generate token
            const token = signToken(req.user);

            console.log('successful login')
            res.status(200).json({token});
            
        }catch(e){
            res.status(500).send(e);
        }
    },
    googleOAuth: async(req,res,next)=>{
        console.log('req.user :',req.user);
        const token = signToken(req.user);
        res.status(200).json({token });
    }
    ,secret: async(req,res,next)=>{
        try{
            console.log('User Controller secret Called')
            res.send('User Controller secret Called');
        }catch(e){
            res.status(500).send(e);
        }
    }

}