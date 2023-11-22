//  mongose import
const mongose = require("mongoose");

//user scema
const PeopleScema = new mongose.Schema({
     username :{
        type: String,
        required: true,           
     } ,
     password :{
       type: String,
       required: true,             
     },
     email :{           
        type: String,
        required: true,
        unique: true,
     },
     avatar:{
        type: String,
        required: true,
     }
     ,
     phone_number:{    
        type: String,
        required: true,
        unique: true,
     }
    ,
     gender:{
        type: String,
        default :"male"
     }
     ,address:{               
        type: String,
        required: true,
     },
     role:{
        type: String,
        enum:["student",'instructor',"admin"],
        default:"student"
     },
},{
     timestamps: true
})

module.exports = PeopleScema;