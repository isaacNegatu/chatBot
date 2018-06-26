
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var DifferentialFeesSchema = new Schema ({
  dentalAssisting : Number,
  dentalHygiene : Number,
  nursing : Number,
  onlineCourses : Number,
  orthoticTechnology : Number,
  prostheticTechnology : Number,
  orthticClinicalApplication : Number,
  prostheticClinicalApplication : Number,
  visualCommunicaitonTechnologies : Number,

  courses : [{type : Schema.Types.ObjectId, ref : 'Courses'}],

  application : Number



});

// export mongo schema
module.exports = mongoose.model('DifferentialFees', DifferentialFeesSchema);
