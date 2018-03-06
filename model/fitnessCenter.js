
'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var fitnessCenterchema = new Schema ({

  reciprocity : {type : Schema.Types.ObjectId, ref : 'Reciprocity'},

  fees : {type : Schema.Types.ObjectId, ref : 'Fees'},

  differentialTution : String      //?????
});


module.exports = mongoose.model('TRAF', TRAFschema);
