const express =  require("express");
const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const dotenv = require('dotenv');
dotenv.config({ path: "./../backend/config/.env" })
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoutes");
app.use("/api/v1" , user);
app.use("/api/v1" , product);
app.use("/api/v1" , order);
app.use("/api/v1" , payment);



app.use(errorMiddleware);

module.exports = app;

