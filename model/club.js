
'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var clubschema = new Schema ({

  clubName: String,
  
});


module.exports = mongoose.model('Club', clubschema);
