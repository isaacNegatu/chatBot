
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let scholarshipsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  information: String,
  policies: String,
  
  
  //Mexican Scholarships
  
  //MACAC
});


module.exports = mongoose.model('Scholarship', scholarshipsSchema);
