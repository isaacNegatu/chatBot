
'use strict'

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


module.exports = mongoose.model('Club', clubschema);
