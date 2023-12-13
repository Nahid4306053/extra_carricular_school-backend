const { model, default: mongoose } = require("mongoose");
const CourseSchema = require("../../Model/CourseModel");
const { countBy } = require("lodash");
const CourseModel = new model("Course", CourseSchema);
const fs = require("fs");
const path = require("path");

const UpdateCourse = async (req,res) =>{ 
       if(req.params.id){
     
       try{   
   
         let instructors = [];
         if(req.body.instructors.length > 0){
            JSON.parse(req.body.instructors).forEach(element => {
               instructors.push(new mongoose.Types.ObjectId(element));
            });
           }

            const  dataforDatabase =   {...req.body,instructors:instructors,benifits:JSON.parse(req.body.benifits)}
            const result = await CourseModel.findByIdAndUpdate({_id:req.params.id},dataforDatabase,{new:true}).populate({ path: "instructors", select: "username _id avatar" });
            res.status(200).json({sucess:true,data:result});
           

  }    
   catch(err){
    res.status(500).json({error:{server:{msg:"There is server side error"}}})
    console.log(err);
  }             
   }          
          
}
module.exports = {UpdateCourse}