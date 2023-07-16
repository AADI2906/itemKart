const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsync");
const ApiFeatures = require("../utils/apiFeature");


//Displaying all products
exports.getAllProducts= catchAsync(async(req,res,next)=>{
    const maxProducts = 8; //mtlb ek page pe kitne products reh skte h

    const count = await Product.countDocuments(); // to keep a total track on number of total products register
    const apiFeature = new ApiFeatures(Product.find() , req.query).search().filter().pagination(maxProducts);
    // let product = await Product.find();
    let products = await apiFeature.query;
    if(!products){
        return next(new ErrorHandler("Products not found" , 400));
    }
    res.status(200).json({products:products , count:count , maxProducts})
});

//Displaying Admin products
exports.getAdminProduct= catchAsync(async(req,res,next)=>{
    const products = await Product.find();
    if(!products){
        return next(new ErrorHandler("Products not found" , 400));
    }
    res.status(200).json({products:products})
});

 
//Creating a new Product
exports.createProduct=catchAsync(async(req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(200).json({success:true , product:product});
});

//updating a product
exports.updateProduct=catchAsync(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Products not found" , 400));
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new:true ,
        useFindAndModify:false
    })
    res.status(200).json({success:true , product:product});
});

//deleting a product

exports.deleteProduct=catchAsync(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Products not found" , 400));
    }

    await product.deleteOne();

    res.status(200).json({success:true , message:"Deleted"});
});

//get product details

exports.getProductDetails = catchAsync(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Products not found" , 400));
    }

    res.status(200).json({product:product});
});

//create a review

exports.createReview = catchAsync(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
//Get All reviews....

exports.getAllReviews = catchAsync(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Products not found" , 400));
    }

    res.status(200).json({success:true , reviews:product.reviews});
})

//delete Reviews....

exports.deleteReview = catchAsync(async(req,res,next)=>{
    
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Products not found" , 400));
    }

    const reviews = product.reviews.filter((rev)=>
        rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach(rev=>{
        avg+= rev.rating;
    }) 

    const reviewNum = reviews.length;
    let ratings = 0;
    if(reviewNum===0){
        ratings = 0;
    }
    else{
     ratings =  avg/reviews.length;
  }
    // await Product.findByIdAndUpdate(req.query.ProductId , {
    //     reviews , reviewNum , ratings
    // } , 
    // {
    //     new:true , runValidators:true , useFindAndModify:false
    // })

    product.reviews = reviews;
    product.reviewNum = reviewNum;
    product.ratings = avg;

    await product.save({validateBeforeSave:false});
  
    res.status(200).json({success:true , reviews:reviews});

})