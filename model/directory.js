'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Directory = new Schema({
  
  firstName: String,
  lastName: String,
  occupation: String,
  department: String,
  room: String,
  phoneNumber: Number,
  email: String,

});

module.exports = mongoose.model('Directory', Directory);
