
'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacultyStaffTestSchema = new Schema({

  name: String,

  coursesTaught: [{type: Schema.Types.ObjectId, ref : 'Course'}],

});

module.exports = mongoose.model('FacultyTest', FacultyStaffTestSchema);
