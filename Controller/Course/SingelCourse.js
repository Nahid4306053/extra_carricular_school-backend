const { model } = require("mongoose");
const CourseSchema = require("../../Model/CourseModel");
const CourseModel = new model("Course", CourseSchema);

const singleCourse = async (req,res)=>{
 
  if(req.params.id){
   try{
     const result = await CourseModel.findById({_id:req.params.id}).populate({ path: "instructors", select: "username _id avatar" });
     res.status(200).json({sucess:true,data:result});
      
   }  
   catch(err){
         res.status(500).json({error:{server:{msg:"There is server side error"}}})
         console.log(err);
   }               
  }
}
module.exports = singleCourse;