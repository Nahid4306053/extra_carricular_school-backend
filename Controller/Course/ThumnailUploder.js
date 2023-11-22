const FileUploader = require("../../Utils/FileUploder")


const ThumnailUploder = (req,res,next) =>{
  const uploadthumnail = FileUploader('courseThumnail',1000,['jpg','png','jpeg','webp'],'only jpg png jpeg and webp file allowed')  
  
  uploadthumnail.any()(req,res,(err)=>{
    if(err){
         res.status(200).json({
             error:{avatar:{msg:err}}
        })            
    }
    else{
        next()
    }   
  })
   
}

module.exports = ThumnailUploder;