const multer = require("multer")
const FileUploader = require("../../Utils/FileUploder")

const uploadFile = (req,res,next) =>{
     const upload = FileUploader("avatars",1000,["jpg","png","jpeg","webp"],"Only jpg png jpeg and webp file Accpted")    
     
     upload.any()(req,res,(err)=>{
        if(err){
          res.status(200).json({error:{ avatar : err  }})       
        }
        else{
           next()
        }             
     })
}

 module.exports = uploadFile;
