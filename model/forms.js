
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var formsschema = new Schema ({

  
  
});

// export mongo schema
module.exports = mongoose.model('forms', formsschema);
