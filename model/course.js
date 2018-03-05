let mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: String, 
  courseID: { // Check with team
    schoolID: String,
    stateID: String,
  },
  credits: Number,
  subject: String, // Math, Science, etc
  section: String,
  description: String,
  location: String,
  room: String,
  seatAvailability: {
    open: String,
    size: String,
    enrolled: String,
    remainingSeats: String,
  },
  schedule: {  /// Days/Hours check with team
    days: [{
      day: {
      	name: String,
        time: {
        	Start: String,
          End: String,
        },
      }
    }],
  },
  cost: Number

});

module.exports = mongoose.model('Course', CourseSchema);