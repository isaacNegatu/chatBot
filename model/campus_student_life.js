
'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var campus_student_lifeschema = new Schema ({

//   reciprocity : {type : Schema.Types.ObjectId, ref : 'Reciprocity'},

//   fees : {type : Schema.Types.ObjectId, ref : 'Fees'},


  
});


module.exports = mongoose.model('CSLIFE', campus_student_lifeschema);
