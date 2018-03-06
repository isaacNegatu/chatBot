'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var athleticsschema = new Schema ({

  address: {
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: String,
  },  
  
  //Sport model
  //Sport name
  // Men | Female
  // Number 
  // Description
  
});


module.exports = mongoose.model('athletics', athleticsschema);
