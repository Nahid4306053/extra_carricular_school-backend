const { model } = require("mongoose");
const CourseSchema = require("../../Model/CourseModel");
const { isEmpty } = require("lodash");
const Course = new model("Course",CourseSchema)
 async function CourseStatusUpdate(req,res) {

  if(req.params.id && req.body.status){
    const result  = await   Course.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true}).populate({ path: "instructors", select: "_id avatar username " })
    if(!isEmpty(result)){
     res.status(200).json({message: "Course Status Update Successfull",  data:result }) 
    }
    else{
      res.status(400).json({message: "Course Status Update Failed",  data:"No data found" })
    }          
  }
  else{
       res.status(400).json({message: "Course Status Update Failed",  msg:"Give course id and status value" })
  }
}

module.exports = CourseStatusUpdate;