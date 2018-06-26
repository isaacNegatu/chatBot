
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var CommonFeesSchema = new Schema({

  tution : Number,
  technology : Number,
  MSCSA : Number,
  studentLife : Number,
  athletic : Number,
  parking : Number


});

// export mongo schema
module.exports = mongoose.model('CommonFees', CommonFeesSchema);
