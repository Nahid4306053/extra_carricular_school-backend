const { isEmpty } = require("lodash");
const { model } = require("mongoose");
const FollowModel = require("../../Model/FollowModel");
const FollowerSchema = new model("follow",FollowModel)


async function  UnFollow(req,res) {
  try{
   if(req.params.id){
      const CheackFollow = await FollowerSchema.findOne({ student: req.currentUser._id,following:req.params.id});
      if(!isEmpty(CheackFollow)){
       await FollowerSchema.findOneAndDelete({ student: req.currentUser._id,following:req.params.id});
       res.status(200).json({success:true,msg:"UnFollow SuccessFully"});

      }
      else{
        res.status(200).json({error:{msg:"You are Not Followed"}});
      }

   }
  }
  catch(err){
   console.log(err)
  }
}
module.exports = {UnFollow};