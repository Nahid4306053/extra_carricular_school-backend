const { model, default: mongoose } = require("mongoose");
const EnrolledCourse = require("../../Model/EnrolledCourse");
const { isEmpty } = require("lodash");
const EnrolledCourseSchema = new model("enrollcourse",EnrolledCourse)

async function AddStudentInCourse(req,res) {
  try{
   if(req.currentUser.role === "student"){
       if(req.params.cid){
            const CheackEnrollAviability = await EnrolledCourseSchema.findOne({ studentId: req.currentUser._id,courseId:req.params.cid});
           if(CheackEnrollAviability){
                res.status(200).json({error:{msg:"You are Already Enrolled"}});
           }  
           else{ 
             const AddStuInCourse = await EnrolledCourseSchema({ courseId: new mongoose.Types.ObjectId(req.params.cid), studentId: req.currentUser._id }).save()
             res.status(200).json({success:true,msg:"Enroll SuccessFully"});
           }

       }
       else{
         res.status(200).json({error:{msg:"Please Provide Course Id"}})
     }             
   }
   else{
     res.status(200).json({error:{msg:"Only Stident Can Enroll Course"}});
                   
   }


  }
  catch(err){
      res.status(500).json({error:{server:{msg:err}}});
      console.log(err)
  }
}

async function CheackEnrollAviability(req,res){
try{
  if(req.currentUser.role === "student"){
    if(req.params.cid){
        const EnrollAviability = await EnrolledCourseSchema.findOne({ studentId: req.currentUser._id,courseId:new mongoose.Types.ObjectId(req.params.cid)});
    
        if(!isEmpty(EnrollAviability)){ 
           res.status(200).json({enroll:true,data:EnrollAviability});
          
        }  
        else{ 
            res.status(200).json({enroll:false,data:EnrollAviability});
        }
    }
    else{
      res.status(404).json({error:{msg:"Please Provide Course Id"}})
  }             
}
else{
  res.status(404).json({error:{msg:"Only Stident Can Enroll Course"}});           
} 
}
catch(err){
   res.status(500).json({error:{msg:"there is server side errror"}}); 
   console.log(err); 
  } 
}

module.exports = {AddStudentInCourse,CheackEnrollAviability};
