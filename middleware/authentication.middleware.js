const {AuthenticationError} = require('../error');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const authMiddleware = async (req,res,next) => {
   const auth = req.headers.authorization;
   if(!auth || !auth.startsWith('Bearer')){
        throw new AuthenticationError("Invalid token")
   }
   const token = auth.split(' ')[1];
   try {
    const  payload = await jwt.verify(token,process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name };
     next();
   } catch(err) {
    throw new AuthenticationError("Invalid token")
   }
  
}

module.exports = authMiddleware;