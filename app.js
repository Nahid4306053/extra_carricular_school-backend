const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
// dotenv config
dotenv.config()  

// mongoose conection is promise
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Database connnetion successfull")
})

//Set for cros origin 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', ['Content-Type']); 
    next();
  });
  
// cors origin set 
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    sameSite: 'none'
}));


// use json formet 
app.use(express.json())

// url encodedd
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser(process.env.SECRETKEY_KEY_F_COOKIE))

// app static  
app.use(express.static("cyclic-busy-jade-brown-bear-tie-ap-northeast-2" + "/public"))
     
app.use("/user", require("./Routes/User"))

app.use("/course", require("./Routes/Course"))
app.get("/",(req,res)=>{
    res.send("Server is running")
})
app.use((req,res,next,err)=>{
   if(err){
    console.log(err)
   }  
   else{
    next()
   }
})
app.listen(process.env.PORT_DATABASE, () => {
    console.log("Server is running on port " + process.env.PORT_DATABASE)
})
