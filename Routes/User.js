const { Router } = require("express");
const UserSignUp = require("../Controller/User/UserSignup");
const {Uservalidetion, uservalidetionResult} = require("../Middlewares/User/Uservalidetor");
const Userlogin = require("../Controller/User/UserLogin");
const { UserloginValidetioin, UserLogInValidetionResult } = require("../Middlewares/User/Loginvalidetor");
const { CheckUser } = require("../Middlewares/Commmon/Checkuser");
const { UserUpdatedInfoValidetion, UpdateInfoValidetionResult } = require("../Middlewares/User/UserUpdateDataValidetion");

// cors
const user = Router()
const UserUpdate = require("../Controller/User/UserUpdate");
const Alluser = require("../Controller/Users.all");
const UserRoleUpdate = require("../Controller/User/UserRoleUpdate");
const { Singeluser } = require("../Controller/User/SingelUser");
const LogoutUser = require("../Controller/User/LogoutUser");
const { AddFollower, CheackFollow } = require("../Controller/User/AddFollower");
const { UnFollow } = require("../Controller/User/UnFollow");
const GetFollowAll = require("../Controller/User/GetFollowAll");
const CheckRole = require("../Middlewares/Commmon/CheckRole");


//  routes 
user.post("/" ,  Uservalidetion , uservalidetionResult , UserSignUp)
user.post("/login" , UserloginValidetioin , UserLogInValidetionResult , Userlogin)
user.post("/current" , CheckUser ,(req,res)=>{ res.status(200).json(req.currentUser) })
user.get("/all",CheckUser , Alluser)
user.put("/role/:id", CheckUser  , CheckRole, UserRoleUpdate)
user.put("/", CheckUser ,  UserUpdatedInfoValidetion , UpdateInfoValidetionResult , UserUpdate)
user.get("/singel/:id", Singeluser)
user.delete("/logout",LogoutUser);
user.post("/follow/:id",CheckUser,AddFollower)
user.get("/follow/:id",CheckUser,CheackFollow)
user.delete("/unfollow/:id",CheckUser,UnFollow)
user.get("/follows",CheckUser,GetFollowAll)

module.exports = user; 
