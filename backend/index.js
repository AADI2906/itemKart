const app = require("./app");
// const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const dotenv = require('dotenv');
const connectDb = require("./config/mongodb")
dotenv.config({ path: "./../backend/config/.env" })



connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET , 
})


app.listen(process.env.PORT , ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});

//unhandeled errors

// process.on('unhandledRejection' , (err)=>{
//     console.log("Shutiing the Server");
//     server.close(()=>{
//         process.exit(1);
//     });
// });