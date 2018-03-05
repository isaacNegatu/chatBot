'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var financeSchema = new Schema ({

  TRAf : {type : Schema.Types.ObjectId, ref : 'TRAF'},

  forms : {type : Schema.Types.ObjectId, ref : 'Forms'},


});
