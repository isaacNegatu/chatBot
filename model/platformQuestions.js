let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var questionSchema = new Schema({
  platform: String,
  id_fromPlatorm: String,
  date: { type: Date, default: Date.now },
  question: String
});





module.exports = mongoose.model('PlatformQuestion', questionSchema);