
// catches unsafe action and throws error
'use strict';

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var financialAidSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  fasfaCode: Number,
  description: String,
  
});

// export mongo schema
module.exports = mongoose.model('financialAid', financialAidSchema);
