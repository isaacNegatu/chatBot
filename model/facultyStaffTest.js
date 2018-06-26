
// catches unsafe action and throws error
'use strict';

// for mongoDB connection
let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacultyStaffTestSchema = new Schema({

  name: String,

  coursesTaught: [{type: Schema.Types.ObjectId, ref : 'Course'}],

});

// export mongo schema
module.exports = mongoose.model('FacultyTest', FacultyStaffTestSchema);
