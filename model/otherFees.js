
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var otherFeesSchema = new Schema({

  application : Number,
  fileSearchCharge : Number,
  internationalStudentHealthInsurance: String,
  NSFcheck : Number,
  returnedPayment : Number,
  testOut : Number,
  latePayment : String,
  transciptProcessingCharge : String

});

// export mongo schema
module.exports = mongoose.model('OtherFees', otherFeesSchema);
