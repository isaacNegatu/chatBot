
// catches unsafe action and throws error
'use strict'

// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var clubsschema = new Schema ({

  clubs: [{type: Schema.Types.ObjectId, ref : 'Club'}],
});


// export mongo schema
module.exports = mongoose.model('Clubs', clubsschema);
