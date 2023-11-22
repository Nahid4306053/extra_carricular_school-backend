const {
                    default: mongoose,
                    Schema
} = require("mongoose");
const CourseSchema = new Schema({
                    coursetitle: {
                                        type: String,
                                        required: true
                    },
                    slogan: {
                                        type: String,
                                        required: true
                    },
                    category: {
                                        type: String,
                                        required: true
                    },
                    description: {
                                        type: String,
                                        required: true
                    },
                    coursefee: {
                                        type: Number,
                                        required: true
                    },
                    thumbnail: {
                                        type: String,
                                        required: true
                    },
                    courseduration: {
                                        type: Number,
                                        required: true
                    },
                    startdate: {
                                        type: Date,
                                        required: true
                    },
                    applicationdeadline: {
                                        type: Date,
                                        required: true
                    },
                    eligibility: {
                                        type: String,
                                        required: true
                    },
                    instructors: [{
                                        type: Schema.Types.ObjectId,
                                        required: true,
                                        ref: 'People'
                    }],
                    benifits: {
                                        type: Array,
                                        required: true
                    },
                    status:{
                                        type: String,
                                         enum:['pending','disable','aprove'],
                                         default:'pending',               
                    }
}, {
                    timestamps: true
})

module.exports = CourseSchema;