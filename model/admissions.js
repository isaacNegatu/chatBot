
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
      Description: String,
      // More information regarding what is next
      // How to get involved...
    },
    
    stepsToApply: String, // <== Description or maybe add more
    
    contactInformation: {
      
      phone: String,
      
    }
  },
  
  
  // Transfering Student
  
  // International Student
  
  // Returning Student
  
  // Highschool Options
  
  // Non-Degree
  
});


module.exports = mongoose.model('admissions', admissionsschema);
