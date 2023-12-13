const path = require("path");
const fs = require("fs");
const PeopleScema = require("../../Model/UserModel");
const { model } = require("mongoose");
const PeopleModel = new model("People",PeopleScema)
const UserUpdate = async (req,res) =>{
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


module.exports = UserUpdate;