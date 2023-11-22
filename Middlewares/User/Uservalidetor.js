const { check, validationResult } = require("express-validator");
const fs = require("fs");
const PeopleScema = require("../../Model/UserModel");
const { model } = require("mongoose");
const { isEmpty } = require("lodash");
const filedestinetion = "/../../public/uploads/avatars/";
const Usermodel = new model("People",PeopleScema)
const  Uservalidetion = [
    check('username').trim()
    .isLength({min:3,max:25})
    .withMessage("Name must min charecter 3 and 25 max charecter"),
     check('password').trim()
    .isStrongPassword()
    .withMessage("Password must has One Uppercase ,lowercase , Special charecter , and lenth 8 charecter"),
     check('email').trim()
    .isEmail()
    .withMessage("Give a valid Email address")
    .custom(async (req)=>{
     const email = await Usermodel.findOne({email:req})
     if(!isEmpty(email)){
            throw new Error("Email already Exits")
        }
    })
    ,
     check('phone_number').trim()
    .isMobilePhone('bn-BD')
    .withMessage("Only bangaldeshi phone number allow")
    .custom(async(req)=>{
      const phone = await Usermodel.findOne({phone_number:req})
       if(!isEmpty(phone)){
          throw new Error("Phone number already Exits")          
       }
    }),
]

const uservalidetionResult = (req,res,next) =>{
          const error   =  validationResult(req);
          if(!error.isEmpty()){ 
           const mappedError = error.mapped()
           fs.unlink(`${__dirname+filedestinetion+req.files[0].filename}`,(err)=>{
            if(err){  
               res.status(500).json({error:{server:{msg:"There is server side"}}})     
            }
            else{
             res.status("200").json({
                  error:mappedError
             })       
            }
           })
          }
          else{ 
             next()
          }
}

module.exports = {Uservalidetion , uservalidetionResult};