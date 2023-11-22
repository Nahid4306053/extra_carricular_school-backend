const { check, validationResult } = require("express-validator");
const { model } = require("mongoose");
const PeopleScema = require("../../Model/UserModel");
const Peolemodel = model("People",PeopleScema)

const UserloginValidetioin = [
   check("email").isEmail().withMessage("Please Provide a valid Email")
   .custom(async(req)=>{
      const FindUserEmail = await Peolemodel.findOne({email:req})
      if(!FindUserEmail){
         throw new Error("Email is not registered")
      }
   }) ,
   check("password").isLength({min:8}).withMessage("Please Provide a valid Password")    
]

const UserLogInValidetionResult = (req,res,next) =>{
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      const mappedErros = errors.mapped();
       res.status(200).json({error:mappedErros})
   }
   else{
      next()       
   }
}

module.exports = {UserloginValidetioin , UserLogInValidetionResult}