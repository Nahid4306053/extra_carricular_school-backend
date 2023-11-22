const { model } = require("mongoose");
const PeopleScema = require("../../Model/UserModel");
const { isEmpty } = require("lodash");
const users  = new model("People",PeopleScema);

const UserRoleUpdate = async (req,res) =>{
  try{
    const id = req.params.id;
    const role = req.body.role;

    const user = await users.findById(id);
    if(!isEmpty(user)){
       const  response = await users.findByIdAndUpdate(id,{role:role},{new: true}).select("-password");
       res.status(200).json({message:"success", data:response});
    }
    else{        
        res.status(500).json({error:{User:{msg:"User Not Found"}}})
    }
  }
  catch(error){
    res.status(500).json({error:{server:{msg:error}}})
  }
}

module.exports = UserRoleUpdate;