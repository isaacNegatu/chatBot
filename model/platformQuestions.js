// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var questionSchema = new Schema({
  platform: String,
  platform_id: String,
  date: { type: Date, default: Date.now },
  question: String
});




// export mongo schema
module.exports = mongoose.model('PlatformQuestion', questionSchema);