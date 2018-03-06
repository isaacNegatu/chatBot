
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
    
    stepsToApply: {
      description: String,
      sumbittingTranscripts: String,
      applicationLink: String,
    },
    
    contactInformation: {
      phone: String,
      fax: String,
      //General Email
    }
  },
  
  transferStudent: {
    orientationTimes: [{
      date: String,
      time: String,
    }],
    
    creditTransferPolicy: String,
    
    afterAcceptance: {
      Description: String,
      // More information regarding what is next
      // How to get involved...
    },
    
    stepsToApply: {
      description: String,
      sumbittingTranscripts: String,
      applicationLink: String,
    },
    
    contactInformation: {
      phone: String,
      fax: String,
      //General Email
    }
  },
  
  InternationStudent: {
    orientationTimes: [{
      date: String,
      time: String,
    }],
    
    afterAcceptance: {
      Description: String,
      // More information regarding what is next
      // How to get involved...
    },
    
    stepsToApply: {
      description: String,
      sumbittingTranscripts: String, // Internation transcripts?
      applicationLink: String,
    },
    
    contactInformation: {
      phone: String,
      fax: String,
      //General Email
    }
  },
  
  returningStudent: {
    orientationTimes: [{
      date: String,
      time: String,
    }],
    
    creditTransferPolicy: String,
    
    afterAcceptance: {
      Description: String,
      // More information regarding what is next
      // How to get involved...
    },
    
    stepsToApply: {
      description: String,
      sumbittingTranscripts: String,
      applicationLink: String,
    },
    
    contactInformation: {
      phone: String,
      fax: String,
      //General Email
    }
  },
  // Returning Student
  
  // Highschool Options
  
  // Non-Degree
  
});


module.exports = mongoose.model('admissions', admissionsschema);
