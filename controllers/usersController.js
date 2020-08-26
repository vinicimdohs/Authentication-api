module.exports = {
    singup: async(req,res,next)=>{
        try{
            //email and pass
            console.log('User Controller singUp Called')
            res.send(req.value.body);
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