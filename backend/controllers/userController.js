const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsync");
const sendJwt = require("../utils/jwt")
let sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const cloudinary = require("cloudinary");
const { name } = require("ejs");

//Create a new User.. 

exports.createUser = catchAsync(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
      folder:"avatars" , 
      width: 150 , 
      crop: "scale"
    })

    const {name,password,email} = req.body;
    const user = await User.create({
        name , email , password,
        avatar:{
            public_id: myCloud.public_id , 
            url: myCloud.secure_url,
        }
    })

    // const token = user.getJwtToken() ab iss line ki jgh woh jwttoken fn demge

    // res.status(201).json({success:true , token});
    sendJwt(user , res , 201);
});

//Login user
exports.LoginUser = catchAsync(async(req,res,next)=>{
 
    const {email , password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Bad request" , 400));
    }

    const isPassword = await user.comparePass(password);
    if(!isPassword){
        return next(new ErrorHandler("Bad request" , 400));
    }
    sendJwt(user , res , 200);
    
})

//logout user
exports.logOut = catchAsync(async(req,res,next)=>{
    //logout krne k liye cookie ko hi zero krdo coz without cookie we cant handle any data out there...
    res.cookie("token" , null , {
        expires: new Date(Date.now()) ,
        httpOnly:true
    });

    res.status(201).json({success:true , message:"Logout successfully"})
})

//Forgot password

exports.forgotPassword = catchAsync(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = await user.getResetPassToken();
  
  await User.updateOne({email:user.email} , {$set:{resetPassToken:resetToken ,resetPassExpire : Date.now() + 15*60*1000}});
  console.log(resetToken);
  

  const resetPasswordUrl = `${process.env.FRONTEND_PORT}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
  
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {

    await User.updateOne({email:user.email} , {$set:{resetPassToken:undefined ,resetPassExpire :undefined}});

    return next(new ErrorHandler(error.message, 500));
  }
});


//reset password

exports.resetPassword = catchAsync(async (req, res, next) => {

  const resetPassToken = req.params.token;

  const user = await User.findOne({
    resetPassToken:resetPassToken,
    resetPassExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not exist", 400));
  }


  user.password = req.body.newPassword;
  user.resetPassToken = undefined;
  user.resetPassExpire = undefined;

  await user.save();
  
  // res.status(200).json({success:true , message:"Succesfully changed password"})
  
  sendJwt(user , res , 200);
});

//get user details

exports.userDetails = catchAsync(async(req,res,next)=>{

  const user = await User.findById(req.user.id);

  res.status(200).json({success:true , user})
  

})

//update user password
exports.updatePass = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePass(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendJwt(user, res, 200);
});

//update user profile
exports.updateProfile = catchAsync(async(req,res,next)=>{

  const newUser = {
    name:req.body.name , 
    email:req.body.email,
    avatar:req.body.avatar
  }

  
  const userr = await User.findById(req.user.id);

 
  //we will add cloudinary later for avatar purposes
  //now we are adding cloudinary

  if(req.body.avatar!=""){
    
    const imgId = userr.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imgId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
    folder:"avatars" , 
    width: 150 , 
    crop: "scale"
  })

  newUser.avatar={
      public_id: myCloud.public_id , 
      url: myCloud.secure_url,
  }
  }

  const user = await User.findByIdAndUpdate(req.user.id , newUser , {
    new:true , 
    runValidators:true,
    useFindAndModify:false,
  })


  res.status(200).json({success:true})
  
})

//get all users Admin
exports.getAllUsers = catchAsync(async(req,res,next)=>{
  const users = await User.find();
  res.status(200).json({success:true , users});

})


//get single users Admin... mns admin can see any user

exports.getSingleUser = catchAsync(async(req,res,next)=>{
  const user = User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({success:true , user});

})

//update user profile by admin... mns if admin wants he can make change profile of anyone

exports.updateUserRole = catchAsync(async(req,res,next)=>{

  const newUser = {
    name:req.body.name , 
    email:req.body.email,
    role:req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id , newUser , {
    new:true , 
    runValidators:true,
  })

  res.status(200).json({success:true})
  
})

//delete profile by admin
exports.deleteProfileAdmin = catchAsync(async(req,res,next)=>{

  const user = await User.findById(req.params.id); 

  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }

  await user.deleteOne();
  res.status(200).json({success:true , message:"User Deleted"})
  
})





