const { Schema } = require("mongoose");


const  EnrolledCourse = new Schema({
   courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true
      },
      studentId:{
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
      }
})

module.exports = EnrolledCourse;

