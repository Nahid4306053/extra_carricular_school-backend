const { model } = require("mongoose");
const CourseScema = require("../../Model/CourseModel");
const Courses  = new model("Course",CourseScema);


const Allcourse = async (req,res) =>{
try{ 
  const totalcourse = await Courses.count({});
  const page = req.query.page || 1;
  const limit =  req.query.limit || totalcourse;  
  const rescourse = await Courses.find(req.query.category ? {category:req.query.category} :{}).populate({ path: "instructors", select: "username _id avatar" }).skip((page-1) * limit).limit(limit).sort({ updatedAt: -1 })
  res.status(200).json({sucsess:true, currentpage:page , totalpage: Math.ceil(totalcourse/limit) , currentTotaldata:rescourse.length , totalData: totalcourse ,data:rescourse  })
} 

catch(error){
   res.status(500).json({error:{server:{msg:error}}});
   
}
}

module.exports = Allcourse;