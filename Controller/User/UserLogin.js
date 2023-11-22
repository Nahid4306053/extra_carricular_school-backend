const { model } = require("mongoose");
const PeopleScema = require("../../Model/UserModel");
const { compareSync } = require("bcryptjs");
const { isEmpty, omit } = require("lodash");
const { sign } = require("jsonwebtoken");
const Usermodel = new model("People",PeopleScema)
const Userlogin  = async (req,res,) =>{
 try{
   const user = await Usermodel.findOne({email:req.body.email})
                    if(!isEmpty(user)){            
                      const matchpassword = compareSync(req.body.password,user.password,)    
                       if(matchpassword){
                         const { _id, username, email, avatar, phone_number, gender, address, role, createdAt, updatedAt, __v } = user;
                         const daatforCookie = { _id,username, email, phone_number, role }
                         const dataforClient = { _id, username, email, avatar, phone_number, gender, address, role, createdAt, updatedAt, __v }
                          // json web token 
                         const token =  sign(daatforCookie,process.env.SECRETKEY_KEY_F_JWT,{expiresIn:process.env.EXPIRE_TIME})
                         // Cookie set 
                         res.cookie(process.env.APP_NAME,token,{ maxAge: process.env.EXPIRE_TIME,signed:true ,httpOnly: true , secure: true ,sameSite: 'None'})
                        //response send 
                         res.status(200).json({success:true,user:dataforClient})
                       
                       } 
                       else{ res.status(200).json({error:{ password:{ msg:"Wrong Password" } }}) }                       
                    }
 }
 catch(err){
     console.log(err)
 }
}

module.exports = Userlogin;