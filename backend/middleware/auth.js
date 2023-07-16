const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("./catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthUser = catchAsync(async(req,res,next)=>{
    //{} are applied cos token here must be a string.... otherwise as a object pass hota hai
    const {token} =  req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Bad request" , 401));
    }

    const data = jwt.verify(token , process.env.JWT_SECRET);
    //ab iss token k user ko save krlenge so that only he can access the inner data
    req.user = await User.findById(data.id);
    next();
});

exports.authRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} Not allowed`, 403));
        }

        next();
    }
};

