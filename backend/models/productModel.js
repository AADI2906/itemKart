const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true
    },
    desc:{
        type:String , 
        required:true
    },
    price:{
        type:Number , 
        required:true
    },

    images:[{
        public_id:{
            type:String ,
            required:true            
        },
        
        url:{
            type:String ,
            required:true            
        }
        }    
    ],

    category:{
        type:String , 
        required:true
    },

    stock:{
        type:Number , 
        required:true,
        default:1
    },
    
    reviewNum:{
        type:Number , 
        default:0
    },

    reviews:[{
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
        
    name:{
        type:String , 
        required:true,
    },
    rating:{
        type:Number , 
        required:true,
    },
    comment:{
        type:String , 
        required:true,
    },

    }],

    ratings:{
        type:Number , 
        default:0
    },

  

    createdAt:{
        type:Date , 
        default:Date.now
    }

    
})

module.exports = mongoose.model("Product" , productSchema)