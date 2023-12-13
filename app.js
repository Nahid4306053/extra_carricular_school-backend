const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const multer = require("multer")
// dotenv config
dotenv.config()  

// mongoose conection is promise
// Set up CORS configuration

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:5173','https://nahider-school.netlify.app']);
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


app.use( cors({ origin: ['http://localhost:5173',"https://nahider-school.netlify.app"], credentials: true, }) );


// use json formet 
app.use(express.json())

// url encodedd
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser(process.env.SECRETKEY_KEY_F_COOKIE))

// app static  
app.use(express.static("/public"));
     
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use(upload.any());

app.use("/user", require("./Routes/User")) 

app.use("/course", require("./Routes/Course"))
 
app.get("/",(req,res)=>{ 
    res.send("Server is running")
})
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
     },
   });
});

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("Database connnetion successfull")
  app.listen(process.env.PORT_DATABASE, () => {
    console.log("Server is running on port " + process.env.PORT_DATABASE)
})
})

module.exports = app;