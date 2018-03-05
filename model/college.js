'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var CollegeSchema = new Schema({
  name: {
      name: String,
      stateID: String, //Check with Zac
  },

  // College General Infomation
  information: {

    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      zip: String,
    },
    phone: {
      local: String,
      tollFree: String
    },
    fax: String,

    description: String,
    missionStatement: String, //Check if more detail is needed
    visionStatement: String,
    values: [{
      value: String //Check if array structure is correct
    }],

    hours: {
      monday: {
        open: String,
        close: String
      },
      tuesday: {
        open: String,
        close: String
      },
      wednesday: {
        open: String,
        close: String
      },
      thursday: {
        open: String,
        close: String
      },
      saturday: {
        open: String,
        close: String
      },
      sunday: {
        open: String,
        close: String
      }
    },
    holidays: [{
      name: String,
      closed: Boolean,
      hours: {
        open: String,
        close: String
      }
    }]
  },

  academics: {
    departments: [{type : Schema.Types.ObjectID, ref : "Department"}]
  },

  admissions: {
    none: {
      //empty...
    },
  },

  //May be changed \/
  bookstore: {
    none: {
      //empty...
    },
  },

  costFinancialAid: {
    none: {
      //empty...
    },
  },

  continuingEducation: {
    none: {
      //empty...
    },
  },

  campusLifeStudentLife: {
    none: {
      //empty...
    },
  },

  directory: { //(Teachers)
    none: {
      //empty...
    },
  },

  foundationAlumni: {
    none: {
      //empty...
    },
  },

  supportServices: { // Housing?
    none: {
      //empty...
    },
  },

  resources: {
    none: {
      //empty...
    },
  },

  unsorted: { // Misc
    none: {
      //empty...
    },
  }

  // 2 year schools & 4 year?
  // roomandboard: {
  //   none: {
  //     //empty...
  //   },
  // },

});

module.exports = mongoose.model('College', CollegeSchema);
