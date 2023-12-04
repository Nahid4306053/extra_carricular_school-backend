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

app.listen(process.env.PORT_DATABASE, () => {
    console.log("Server is running on port " + process.env.PORT_DATABASE)
})
