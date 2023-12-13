const bcrypt = require("bcryptjs");
const { model } = require("mongoose");
const PeopleScema = require("../../Model/UserModel");
const { isEmpty } = require("lodash");
const Peoplemodel = model("People",PeopleScema)
async function  UserSignUp(req,res){
   var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(req.body.password, salt);
   req.body.password = hash
   const newuser = await Peoplemodel(req.body);
   const response = await newuser.save()
   if(!isEmpty(response)){
      delete response['password'];
     res.status(200).json({
        success:true,
        msg:"user created success"
     })
   }
   else{
      console.log(response);
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