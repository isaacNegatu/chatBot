// for mongoDB connection
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var CourseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  courseID: Number,
  subject: String,
  section: String,
  credits: String,
  meetingDetails: {
    buildingAndRoom: String,
    dates: String,
    instructor: String,
    days: String,
    time: String
  },
  number : String,
  seatAvailability: {
    size: String,
    status : String,
    seatsRemaining: String,
    enrolled: String
  },
  title: String,
  locationDetails: {
    campus: String,
    offeredThrough: String,
    location: String
  },
  semester: String,
  url: String,
  costs: {
    nonResident: String,
    resident: String,
    fees: String
  },
  goals: [String]
});


// export mongo schema
module.exports = mongoose.model("Course", CourseSchema);
