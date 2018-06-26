
// catches unsafe action and throws error
'use strict';

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var PersonSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName : String,
  lastName: String
});

// export mongo schema
module.exports = mongoose.model('Person', PersonSchema);
