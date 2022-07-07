const User = require('../schema/User');
const {BadRequestError} = require('../error');
const {AuthenticationError} = require('../error');

const login = async (req,res) => {
    const {email,password} = req.body;

        const user = await User.findOne({email:email});
        if(!user){
            throw new AuthenticationError("Unauthorized")
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            throw new AuthenticationError("Unauthorized")
        }
        const token = await user.createJWT();
        res.status(200).json({
            name:user.name,
            token:token
        });
}

const register = async (req,res) => {

        const {name,email,password} = req.body;
      
        const user = await User.create(req.body);
        console.log(user);
        const token = user.createJWT();
        res.status(200).json({
            name:user.name,
            token:token
        });
   
  
}

module.exports = {
    login,
    register
}