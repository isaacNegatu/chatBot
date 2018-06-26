// catches unsafe action and throws error
'use strict';

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let scholarshipsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  information: String,
  policies: String,
  
  
  //Mexican Scholarships
  
  //MACAC
});

// export mongo schema
module.exports = mongoose.model('Scholarship', scholarshipsSchema);
