// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  userID: String,
  name: String,

});

// export mongo schema
module.exports = mongoose.model('User', userSchema);