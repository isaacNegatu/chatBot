
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var Libraryschema = new Schema ({

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
  
  //Study Room reservations
  
});

// export mongo schema
module.exports = mongoose.model('Library', Libraryschema);
