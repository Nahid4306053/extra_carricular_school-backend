const { model, default: mongoose } = require("mongoose");
const CourseSchema = require("../../Model/CourseModel");
const { countBy } = require("lodash");
const CourseModel = new model("Course", CourseSchema);

const addcourse = async (req,res) =>{
  try{
  
    let instructors = [];
    if(req.body.instructors.length > 0){
       JSON.parse(req.body.instructors).forEach(element => {
          instructors.push(new mongoose.Types.ObjectId(element));
       });
    }      
    const dataforDatabase = {...req.body,instructors:instructors,benifits:JSON.parse(req.body.benifits)}
    const result = await CourseModel(dataforDatabase).save();
    const finalresult = await CourseModel.findById(result.id).populate({ path: "instructors", select: "username _id avatar" })
    
    res.status(200).json({success:true,data:finalresult })

  }      
  catch(err){
    res.status(500).json({error:{server:{msg:"There is server side error"}}})
    console.log(err);
  }           
}

module.exports = {addcourse}