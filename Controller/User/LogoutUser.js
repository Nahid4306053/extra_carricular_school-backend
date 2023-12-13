 
 async function LogoutUser (req,res) {
   try{

   if(req.signedCookies.extra_carricular_school){
       res.cookie('extra_carricular_school','',{ maxAge: 0 ,signed:true ,httpOnly: true , secure: true ,sameSite:'none'})
      //  res.clearCookie("extra_carricular_school");  
       res.status(200).json({msg:"User Log Out Successfully"})           
   }
   else{
    res.status(404).json({msg:"Cookie Not Found"})    
   }
   }
   catch(err){
    res.status(500).json({error:{server:{msg:err}}})
   }
}

module.exports = LogoutUser;