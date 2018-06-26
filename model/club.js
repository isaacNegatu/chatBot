
// catches unsafe action and throws error
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var clubschema = new Schema ({

  _id: Schema.Types.ObjectId,
  
  clubName: String,
  description: String,
  meetingTimes: [{
      date: Number,
      Start: Number,
      End: Number
    },] // <=== Done right?
});


// export mongo schema
module.exports = mongoose.model('Club', clubschema);
