const path = require("path")
const { diskStorage } = require("multer")
const multer = require("multer")
const FileUploader = (subfolder,limit,minetype,errmsg) =>{
   const destinetion =  path.join(__dirname,"/../public/uploads",subfolder)
   const diskstorage = diskStorage({
      destination: (req,res,cb)=>{
         cb(null,destinetion); 
      } ,
      filename: (req,file,cb)=>{
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname.replace(fileExt,'').replace(/\s+/g,'-') + Date.now() + fileExt;
        cb(null,filename)
      }       
   })
   const upload = multer({
     storage: diskstorage,
     limit : {
      fileSize : limit,
      files : 1
     },
     fileFilter : (req,file,cb)=>{ 
      if(minetype.includes(file.mimetype.split("/")[1])){
         cb(null,true)
      }    
      else{
        cb(errmsg,false)
      }              
     }
   })
   return upload;
}



module.exports = FileUploader;