const mongoose = require("mongoose");



const connectDb=()=>{
    mongoose.connect(process.env.DB , {useNewUrlParser:true} , {useUnifiedTopology: true}).then(()=>{
        console.log("Connected to MongoDb");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb;
