
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var campus_student_lifeschema = new Schema ({

  library : {type : Schema.Types.ObjectId, ref : 'Library'},
  
  facultyStaff : {type : Schema.Types.ObjectId, ref : 'Faculty'},
  
  // Refrence to phone in phoneschema?
  
  cafeteria : {type : Schema.Types.ObjectId, ref : 'Cafeteria'},
  
  fitnessCenter : {type : Schema.Types.ObjectId, ref : 'fitnessCenter'},
  
  
});


// export mongo schema
module.exports = mongoose.model('CSLIFE', campus_student_lifeschema);
