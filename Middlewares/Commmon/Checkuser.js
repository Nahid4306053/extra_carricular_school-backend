const { signedCookies } = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const PeopleScema = require("../../Model/UserModel");
const { model } = require("mongoose");
const PeopleModel = new model("People",PeopleScema);
const CheckUser = async (req,res,next) =>{
   if(req.signedCookies[process.env.COOKIE_NAME]){
      const clientedCookie = req.signedCookies[process.env.COOKIE_NAME];
      const CookieDtaas = verify(clientedCookie,process.env.SECRETKEY_KEY_F_JWT);
      const {iat,exp,...fields} = CookieDtaas;          
      const user = await PeopleModel.findOne({_id:fields._id ,email:fields.email }).select("-password")
      if(user){
        req.currentUser = user;
        next()
      }
      else{
        res.status(200).json({error:{user:{msg:"User not found"}}})
      }      
   }
   else{
    res.status(200).json({error:{user:{msg:"User not found"}}})
  }
}

module.exports = {CheckUser}