
'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var clubsschema = new Schema ({

  clubs: [{type: Schema.Types.ObjectId, ref : 'Club'}],
});


module.exports = mongoose.model('Clubs', clubsschema);
