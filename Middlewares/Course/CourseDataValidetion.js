const {
    check,
    validationResult
} = require("express-validator");
const fs = require("fs");
const path = require("path");
const CourseDataValidetion = [
    check('coursetitle').trim().isLength({
        min: 20,
        max: 300
    })
    .withMessage('course title must be between 20 and 300 characters long'),
    check('category').trim().isLength({
        min: 3
    })
    .withMessage("select a Course Category"),
    check('slogan').trim().isLength({
        min: 10,
        max: 300
    }).withMessage('course slogan must be between 10 and 300 characters long'),
    check('eligibility').trim().isLength({
        min: 1
    }).withMessage("Eligibility field is required"),
    check('startdate').trim().isDate().withMessage("Start Date field is required"),
    check('applicationdeadline').trim().isDate().withMessage("Application Deadline field is required"),
    check('coursefee').trim().isNumeric().withMessage("Course Fee field is required and should be a number"),
    check('courseduration').trim().isNumeric().withMessage("Course Duration field is required and should be a number"),
    check('description').trim().isLength({
        min: 100,
        max: 3000
    }).withMessage('course description must be between 100 and 3000 characters long'),
];

const courseDatavalidetionResult = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped()
     res.status(200).json({
         error: mappedErrors
     })

    } else {
        next()
    }
}

module.exports = {
    CourseDataValidetion,
    courseDatavalidetionResult
}