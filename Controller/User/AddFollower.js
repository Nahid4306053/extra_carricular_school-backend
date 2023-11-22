const { model } = require("mongoose");
const FollowModel = require("../../Model/FollowModel")
const FollowerSchema = new model("follow",FollowModel)

 async function AddFollower(req,res) {
   try{ 
     if(req.currentUser.role === "student"){
            if(req.params.id){
                 const CheackFollow = await FollowerSchema.findOne({ student: req.currentUser._id,following:req.params.id});
                if(CheackFollow){
                     res.status(200).json({error:{msg:"You are Already Followed"}});
                }  
                else{ 
                  const AddFollow = await FollowerSchema({ student: req.currentUser._id,following:req.params.id}).save()
                  res.status(200).json({success:true,msg:"Follow SuccessFully"});
                }
              }
              else{
             res.status(200).json({error:{msg:"Please Provide Student Id"}})
     }

 }
 else{
       res.status(200).json({error:{msg:"Only Student Can follow"}});
 }
}
 catch(err){
     res.status(500).json({error:{server:{msg:err}}});
     console.log(err)
}
}

async function CheackFollow(req,res){

try{

     if(req.currentUser.role === "student"){
            if(req.params.id){
                 const CheackFollow = await FollowerSchema.findOne({ student: req.currentUser._id,following:req.params.id});
                if(CheackFollow){
                     res.status(200).json({follow:true,msg:"You are Already Followed"});
                }  
                else{ 
                  res.status(200).json({follow:false,msg:"Not followed"});
                }
              }
            else{
         res.status(200).json({error:{msg:"Please Provide Student Id"}})
     }
 }
 else{
       res.status(200).json({error:{msg:"Only Student Can follow"}});
 }
}

 catch(err){
     res.status(500).json({error:{server:{msg:err}}});
     console.log(err)
}
}


 module.exports = {AddFollower,CheackFollow};
