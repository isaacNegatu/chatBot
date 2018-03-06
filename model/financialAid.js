
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var financialAidSchema = new Schema({
  _id: Schema.Types.ObjectId,
  

});


module.exports = mongoose.model('financialAid', financialAidSchema);
