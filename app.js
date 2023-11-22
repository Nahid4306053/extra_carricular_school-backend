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

// cors origin set 
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));


// use json formet 
app.use(express.json())

// url encodedd
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser(process.env.SECRETKEY_KEY_F_COOKIE))

// app static  
app.use(express.static(__dirname + "/public"))
     
app.get("/",(req,res)=>{
   res.send("App is runnig") 
})

app.use("/user", require("./Routes/User"))

app.use("/course", require("./Routes/Course"))

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
 