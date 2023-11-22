const { model } = require("mongoose");
const FollowModel = require("../../Model/FollowModel");
const FollowerSchema = new model("follow",FollowModel);


async function GetFollowAll(req,res) {

    try {
       const page = req.query.page || 1;
       const limit = req.query.limit || 10;            
        if(req.currentUser.role === "student"){        
             const follow = await FollowerSchema.find({student:req.currentUser._id}).populate({ path: 'following', select: '-password' })
             .skip((page - 1) * limit)
             .limit(limit)
              res.status(200).json({data:follow});  
                   
        }       
         else{        
             const follow = await FollowerSchema.find({following:req.currentUser._id}).populate({path:'student',select:"-password"}).skip((page-1) * limit).limit(limit);
              res.status(200).json({data:follow});           
        }             
       
    } catch (error) {
        res.status(500).json({error:error});
        console.log(error)
    }
}

module.exports = GetFollowAll;
