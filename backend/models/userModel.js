const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const catchAsync = require("../middleware/catchAsync");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      role: {
        type: String,
        default: "user",
      },
      
      resetPassToken: String,
      resetPassExpire: Date,
    });

//before saving this model hash the pw and then save it...
userSchema.pre("save" , (async function(next){
    if(!this.isModified){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
}))

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET , {
        expiresIn:process.env.JWT_EXPIRE
    });
}

userSchema.methods.comparePass = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

//generating reset pw token

userSchema.methods.getResetPassToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPassToken =  crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPassExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("User" , userSchema);