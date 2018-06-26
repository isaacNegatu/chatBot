
// catches unsafe action and throws error
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var FeesSchema = new Schema({

  commonFees : {type : Schema.Types.ObjectId, ref : 'CommonFees'},

  differentialTutionFees : {type : Schema.Types.ObjectId, ref : 'DifferentialFees'},

  otherFees : {type : Schema.Types.ObjectId , ref : 'OtherFees'}

});

// export mongo schema
module.exports = mongoose.model("Fees", FeesSchema);
