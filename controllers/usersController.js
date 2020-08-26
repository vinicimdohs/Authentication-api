const User = require('../models/UserModel');


module.exports = {
    singup: async(req,res,next)=>{
        try{
            //email and pass          
            const {email,password} = req.value.body;

            //if there is a user whith the same email
            const foundUser = await User.findOne({email});
            if(foundUser){
                return res.status(403).send({error: 'Email existente'});
            }
            //create a new user
            const newUser = new User({email,password});
            await newUser.save();

            //responder com o token
            res.send(newUser);
        }catch(e){
            res.status(500).send(e);
        }
    },singin: async(req,res,next)=>{
        try{
            //generate token
            console.log('User Controller singin Called')
            res.send('User Controller singin Called');
        }catch(e){
            res.status(500).send(e);
        }
    },secret: async(req,res,next)=>{
        try{
            console.log('User Controller secret Called')
            res.send('User Controller secret Called');
        }catch(e){
            res.status(500).send(e);
        }
    }

}