'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;



//Notes:
/**
- Meal Plan / Prices
- More than one caferteria location
- Restraunts on campus Ex: Starbucks, Chick-fil-a

**/
var cafeteriaschema = new Schema ({

  cafeteriaName: String,
    
  hours: {
    monday: {
      open: String, // <=== Change the number?
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


module.exports = mongoose.model('cafeteria', cafeteriaschema);
