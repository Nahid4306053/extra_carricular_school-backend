// add express
const express = require("express");
const { CheckUser } = require("../Middlewares/Commmon/Checkuser");
const { addcourse } = require("../Controller/Course/AddCourse");

const { CourseDataValidetion, courseDatavalidetionResult } = require("../Middlewares/Course/CourseDataValidetion");
const Allcourse = require("../Controller/Course/Coures.All");
const { update } = require("lodash");
const { UpdateCourse } = require("../Controller/Course/UpdateCourse");
const singleCourse = require("../Controller/Course/SingelCourse");
const CourseStatusUpdate = require("../Controller/Course/CourseStatusUpdate");
const WhichListCourses = require("../Controller/Course/WhichListCourses");
const {AddStudentInCourse, CheackEnrollAviability} = require("../Controller/Course/AddStudentInCourse");
const CheckRole = require("../Middlewares/Commmon/CheckRole");

const course = express.Router();

// routes  

course.post("/", CheckUser,CheckRole, CourseDataValidetion , courseDatavalidetionResult ,  addcourse) 
course.put("/:id", CheckUser,CheckRole, CourseDataValidetion , courseDatavalidetionResult , UpdateCourse)
course.get("/singel/:id", CheckUser ,singleCourse ) 
course.get("/all",CheckUser, Allcourse )
course.put("/status/:id",CheckUser,CheckRole,CourseStatusUpdate)
course.post("/whichlist",CheckUser,WhichListCourses)
course.post('/enroll/:cid',CheckUser,AddStudentInCourse)
course.get('/enroll/:cid',CheckUser ,CheackEnrollAviability)
module.exports = course; 