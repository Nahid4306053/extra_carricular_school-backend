const { model } = require("mongoose");
const CourseSchema = require("../../Model/CourseModel");
const corses = new model("Course",CourseSchema);
 const WhichListCourses  = async (req,res)  =>{
  try{
    if(req.body){
      const courses = await corses.find({_id:{$in:req.body}}).populate({path:"instructors",select: "username _id avatar"});
      res.status(200).json({sucsess:true,data:courses});
    } 
    else{
      res.status(200).json({error:{msg:'Please Provide Course id array'}});
    }            
  }
  catch(err){
     res.status(500).json({error:{server:{msg:err}}});
     console.log(err)
  }
}

module.exports = WhichListCourses;
