
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var scholarshipsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName : String,
  lastName: String
});


module.exports = mongoose.model('Person', PersonSchema);
