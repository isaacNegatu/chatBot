/*
  TRAF - Tuition Reciprocity and Fees
  
  !!!! note : Incomplete !!!
  
  
*/

// catches unsafe action and throws error
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var TRAFschema = new Schema ({

  reciprocity : {type : Schema.Types.ObjectId, ref : 'Reciprocity'},

  fees : {type : Schema.Types.ObjectId, ref : 'Fees'},

  differentialTution : String      //?????
});


// export mongo schema
module.exports = mongoose.model('TRAF', TRAFschema);
