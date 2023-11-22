const { check, validationResult } = require("express-validator");

const UserUpdatedInfoValidetion = [
  check("username").trim().isLength({min:3,max:20}).withMessage("Username must be between 3 and 20 characters"),
  check("phone_number").trim().isLength({min:11,max:11}).withMessage("Phone number must 11 characters").isMobilePhone("bn-BD").withMessage("Please Provide Valid Phone Number"),
  check("address").trim().isLength({min:3,max:70}).withMessage("Address must be between 3 and 70 characters"),
]

const UpdateInfoValidetionResult =(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const mappedError = errors.mapped()           
      return res.status(200).json({error:mappedError})
    }
    else{
      next()
    }
}

module.exports ={UserUpdatedInfoValidetion , UpdateInfoValidetionResult}