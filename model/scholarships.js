
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var scholarshipsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  information: String,
  policies: String,
  
  
  //Mexican Scholarships
  
  //MACAC
});


module.exports = mongoose.model('Person', PersonSchema);
