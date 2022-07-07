const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();


const User =  mongoose.Schema({
    name :{
        type : String,
        required : [true,"Please provide name"],
        minLength : [3,"Name must be greater than 3"],
        maxLength : [50,"Name must be greater than 3"]
    },
    email : {
        type : String,
        required : [true,"Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique : true
    },
    password : {
        type : String,
        required : [true,"Please provide password"],
        minlength : 6
    }
});


User.pre('save', function() {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

User.methods.createJWT =  function() {
   return  jwt.sign({userId:this._id,name:this.name }, process.env.JWT_SECRET,   {
        expiresIn: '30d',
      });
   

}
User.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password,this.password)
  return isMatch;

}


module.exports = mongoose.model('USER',User);