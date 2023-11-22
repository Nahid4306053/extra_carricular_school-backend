const { Schema } = require("mongoose");


const  FollowModel = new Schema({
      following:{
      type: Schema.Types.ObjectId,
      ref: "People",
      required: true
      },
      student:{
        type: Schema.Types.ObjectId,
        ref: "People",
        required: true
      }
})

module.exports = FollowModel;
