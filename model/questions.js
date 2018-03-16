let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var questionSchema = new Schema({
  platform: String,
  id_fromPlatorm: String,
  timestamps: Date,
  question: String
});





module.exports = mongoose.model('Question', questionSchema);