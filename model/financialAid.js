
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var financialAidSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  fasfaCode: Number,
  description: String,
  
});


module.exports = mongoose.model('financialAid', financialAidSchema);
