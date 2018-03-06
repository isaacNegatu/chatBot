
'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var fitnesscenterschema = new Schema ({

  // equipment:
  
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
  
    address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
  },
});


module.exports = mongoose.model('fitnessCenter', fitnesscenterschema);
