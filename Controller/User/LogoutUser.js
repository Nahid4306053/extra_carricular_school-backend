
 async function LogoutUser (req,res) {
   try{
   if(req.signedCookies.extra_carricular_school){
       res.clearCookie("extra_carricular_school")  
       res.status(200).json({msg:"User Log Out Successfully"})           
   }
   }
   catch(err){
    res.status(500).json({error:{server:{msg:err}}})
   }
}

module.exports = LogoutUser;