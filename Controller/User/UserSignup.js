const bcrypt = require("bcryptjs");
const { model } = require("mongoose");
const PeopleScema = require("../../Model/UserModel");
const { isEmpty } = require("lodash");
const Peolemodel = model("People",PeopleScema)
async function  UserSignUp(req,res){
   var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(req.body.password, salt);
   const dataforDatabase = {
    ...req.body, 
    avatar : req.files[0].filename,password:hash
   }
   const newuser = await Peolemodel(dataforDatabase);
   const response = await newuser.save()
   if(!isEmpty(response)){
      delete response['password'];
     res.status(200).json({
        success:true,
        msg:"user created success"
     })
   }
   else{
      res.status(500).json({
         error:{
            server:{
               msg:"There is server side error"
            }
         }
      })
   }
} 

module.exports = UserSignUp