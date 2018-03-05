let mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  college: String,
  title: String, 
  courseID: Number,
  credits: Number,
  subject: String, // Math, Science, etc
  section: Number,
  description: String,
  location: String,
  room: String,
  seatAvailability: {
    open: Boolean,
    size: Number,
    enrolled: Number,
    remainingSeats: Number,
  },
  schedule: {  /// Days/Hours check with team
    days: String,
    time: String
  },
  costs: {
    fees: Number,
    costResident: Number,
    costNonResident: Number
  }
});

module.exports = mongoose.model('Course', CourseSchema);