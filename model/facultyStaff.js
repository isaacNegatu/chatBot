
// catches unsafe action and throws error
'use strict';

// for mongoDB connection
let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacultyStaffSchema = new Schema({


  
  person: {type: Schema.Types.ObjectId, ref : 'Person'},
	office: String,

  coursesTaught: {
    courses: [{type: Schema.Types.ObjectId, ref : 'Course'}],
    anyCourses: [{type: Schema.Types.ObjectId, ref : 'Course'}]
  },


  officeHours: [{
    day: {
      name: String,
      time: {
        Start: Number,
        End: Number,
      },
    }
  }],

  phoneNumber: Number,
  email: String,

});

// export mongo schema
module.exports = mongoose.model('Faculty', FacultyStaffSchema);
