let mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  college: String,
  title: String, 
  courseID: Number,
  credits: String,
  subject: String, // Math, Science, etc
  section: String,
  description: String,
  location: String,
  room: String,
  seatAvailability: {
    open: Boolean,
    size: String,
    enrolled: String,
    remainingSeats: String
  },
  schedule: {  /// Days/Hours check with team
    days: String,
    time: String
  },
  costs: {
    fees: String,
    costResident: String,
    costNonResident: String
  }
});

module.exports = mongoose.model('Course', CourseSchema);