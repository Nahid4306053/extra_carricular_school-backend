const { model, default: mongoose } = require("mongoose")
const PeopleScema = require("../../Model/UserModel")
const CourseSchema = require("../../Model/CourseModel");
const { isEmpty } = require("lodash");
const course = require("../../Routes/Course");
const EnrolledCourse = require("../../Model/EnrolledCourse");
const EnrolledCourseShcema = new model("enrollcourse",EnrolledCourse)
const People = new model("People",PeopleScema);
const Course = new model("Course",CourseSchema);

const Singeluser = async (req,res) =>{  
   if(req.params.id){ 
      const user = await People.findOne({_id:req.params.id}).select("-password")
     
      if(!isEmpty(user)){   
          if(user.role === "instructor"){
             const courses = await Course.find({
                'instructors': user._id 
            }).populate({
               path: 'instructors',
               select: 'username _id avatar',
             })
             res.status(200).json({user:user, courses:courses})
          }
          else if(user.role === "student"){
             const courses = await EnrolledCourseShcema.find({studentId:user._id}).populate({
               path: 'courseId', 
               populate: {
                 path: 'instructors',
                 model: 'People',
                 select: 'username _id avatar',
               }
             })
             res.status(200).json({user:user, courses:courses}) 
          } 
      }
      else{
         res.status(200).json({error:{Auth:{msg:"User not found"}}})
      }
   }  
   else{
    res.status(200).json({error:{Auth:{msg:"Please provide user id and role "}}})
   }
}

module.exports = {
    Singeluser
}