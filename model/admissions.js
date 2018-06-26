/*

  admissions:
    fist time student - not in college system, not transfer, non-international
    transfer student - transfer from another college, non-international
    international student - out of country student 
    returning student - in college system, not transfer, non-international
    high-school option - high-school credit option
    
      oritentationTimes - describes orientation information
        date - String: date of orientation
        time - String: time of orientation
        
      afterAcceptance - extra information section
        description - String: extra general information/ misc. data
        
      stepsToApply - other steps required
        description - String: general information about extra steps
        sumbittingTranscripts - String: information specific to submitting transcripts
        applicationLink - String: hyperlink to specific student application information/ link to specific application
        
      contactInformation - student contact information
        phone - String: phone number (required)
        fax - String: fax number if exists
        //General Email - String: contact email

*/

// catches unsafe action and throws error
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var admissionsschema = new Schema ({

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
    
    academicRenewal : { 
      renewalProcess: String,
      creditExpiration: String,
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
  
  highSchoolOptions: {
    careerAndTechnicalEducationCredit: {
      requirments: String,
      procedures: String,
      praticipatingHighSchools: [{schoolName: String},]      
    },
    
    PSEO: {
      stepsToApply: String,
      documents: [{
        documentName: String,
        documentLink: String,
      }],
      parentResources: [{
        resource: String,
      }],
    },
  },
  
});


// export mongo schema
module.exports = mongoose.model('admissions', admissionsschema);
