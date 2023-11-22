const path = require("path");
const fs = require("fs");
const PeopleScema = require("../../Model/UserModel");
const { model } = require("mongoose");
const PeopleModel = new model("People",PeopleScema)
const UserUpdate = async (req,res) =>{
  const Userfind = await PeopleModel.findOne({_id:req.currentUser._id}).select("avatar");

  if(req.files.length === 1){
     fs.unlink(path.join(__dirname,"/../../public/uploads/avatars/",Userfind.avatar),async (err)=>{
         if(err){
           res.status(200).json({error:{avatar:err}})
         }
         else{
          try{
           const userupdate = await PeopleModel.findOneAndUpdate({_id:req.currentUser._id},{
             ...req.body,
             avatar: req.files[0].filename
           })
           res.status(200).json({success:true,msg:"User Updated successFully"})
          }
          catch(err){
           res.status(200).json({error:{server:{msg:"There is server side error"}}})
           console.log(err)
          }
         }
     })
  }
  else{
    try{
      const userupdate = await PeopleModel.findOneAndUpdate({
        _id: req.currentUser._id
      },{...req.body})
      res.status(200).json({success:true,msg:"User Updated successFully"})
     }
     catch(err){
      res.status(200).json({error:{server:{msg:"There is server side error"}}})
     }
  }
}

module.exports = UserUpdate;