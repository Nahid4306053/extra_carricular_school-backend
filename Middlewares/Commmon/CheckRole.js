
 function CheckRole(req,res,next) { 
                 
  if(req.currentUser.role === "admin"){
     next();
   
  }
  else{
    res.status(401).json({error:"You are not authorized to access this resource"})
  }
}
module.exports = CheckRole
  