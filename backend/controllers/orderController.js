const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsync");

exports.newOrder = catchAsync(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });

//get orderdetails

exports.orderDetail = catchAsync(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user" , "name email");

    if(!order){
        return next(new ErrorHandler("Order not found" , 404));
    }

    res.status(201).json({
        success:true , 
        order
    });
})

//Get all orders --user
exports.myOrders = catchAsync(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id}).populate("user" , "name email");

    if(!orders){
        return next(new ErrorHandler("Order not found" , 404));
    }

    res.status(201).json({
        success:true , 
        orders
    });
})

//get all orders -- admin
exports.getAllOrders = catchAsync(async(req,res,next)=>{
    const orders = await Order.find();

    if(!orders){
        return next(new ErrorHandler("Order not found" , 404));
    }

    let toatalAmount = 0;

    orders.forEach((order)=>{
        toatalAmount+=order.totalPrice
    })



    res.status(201).json({
        success:true , 
        orders , toatalAmount
    });
})

// update order status... ofc admin can do

exports.updateOrder = catchAsync(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found" , 404));
    }

    if(order.orderStatus==="delivered"){
        return next(new ErrorHandler("Item has been delivered already" , 201));
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product , order.quantity);
    })

    order.orderStatus = req.body.status;
    if(req.body.status === "delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:true});

    res.status(201).json({
        success:true , 
        order
    });
})

async function updateStock(id , quantity){
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({validateBeforeSave:true});
}

//delete order --admin

exports.deleteOrder = catchAsync(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found" , 404));
    }

    await order.deleteOne();

    res.status(201).json({
        success:true , 
    });
})




