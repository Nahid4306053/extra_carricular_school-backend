const { model } = require("mongoose");
const PeopleScema = require("../Model/UserModel");
const users  = new model("People",PeopleScema);

const Alluser = async (req,res) =>{
try{ 
  const totaluser = await users.count(req.query.role ? {role:req.query.role} : {});
  const page = req.query.page || 1;
  const limit =  req.query.limit || totaluser;          
  const resUser = await users.find(req.query.role ? {role:req.query.role} : {role:{$ne:"admin"}}).skip((page-1) * limit).limit(limit).sort({ updatedAt: -1 }).select("-password ")
 
  res.status(200).json({message:"success", data:resUser, totaldata:resUser.length, page: Math.ceil(totaluser/limit),totaluser:totaluser , currentpage:page});
} 

catch(error){
   res.status(500).json({error:{server:{msg:error}}});

}
}

module.exports = Alluser;