
'use strict'

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

  courses : [{type : Schema.Types.ObjectId, ref : 'Courses'}];

  application : Number



});

module.exports = mongoose.model('DifferentialFees', DifferentialFeesSchema);
