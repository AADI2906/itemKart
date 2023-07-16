const catchAsync = require("../middleWare/catchAsync")

const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.processPayment = catchAsync(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount : req.body.amount , 
        currency:"inr" , 
        metadata:{
            company:"ItemKart"
        }
    })

    res.status(201).json({success:true , client_secret:myPayment.client_secret})

})

exports.sendStripeKey = catchAsync(async(req,res,next)=>{

    res.status(201).json({stripe_key:process.env.STRIPE_API_KEY});
})

