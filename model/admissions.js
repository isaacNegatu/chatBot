
'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var admissionsschema = new Schema ({

  // First Time Student
  firstTimeStudent: {
    orientationTimes: [{
      date: String,
      time: String,
    }],
    
    afterAcceptance: {
      D
    },
  },
  
  
  // Transfering Student
  
  // International Student
  
  // Returning Student
  
  // Highschool Options
  
  // Non-Degree
  
});


module.exports = mongoose.model('admissions', admissionsschema);
