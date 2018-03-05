
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var PersonSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName : String,
  lastName: String
});


module.exports = mongoose.model('Person', PersonSchema);
