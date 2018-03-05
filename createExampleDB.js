let mongoose = require('mongoose');
var Course = require("./model/course");
var CommonFees = require("./model/commonFees");


var db = 'mongodb://Isaac:123456@ds046357.mlab.com:46357/chatbotdb';

mongoose.connect(db);

mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
}).then(function (){
  mongoose.connection.db.listCollections().toArray(function(err, names){
    if (err) console.log(err);

    names.forEach(function (col){
      console.log(col.name);
    });
  });

});


var OOP = new Course({
  _id: new mongoose.Types.ObjectId(),
  title: "Object-Oriented Programming",
  courseID:{
    schoolID: "000409",
    stateID: "123456"
  },
  credits: 3,
  subject: "Computer Science",
  secton: "90",
  description: "This course introduces the concepts of object-oriented programming to students with a background in the procedural paradigm. It begins with a review of control structures and data types with emphasis on structured data types and array processing. It then moves on to introduce the object-oriented programming approach, focusing on the definition and use of classes along with the fundamentals of object-oriented design. Other topics include an overview of programming language principles, simple analysis of algorithms and an introduction to software engineering issues. Prerequisite: CSCI 1081 or CSCI 2011.",
  location: "Century West Campus",
  room: "W3110",
  seatAvailability:{
    open: "Yes",
    size: "30",
    enrolled: "19",
    remainingSeats: "11"
  },
  schedule:{
    days:[{
      day: {
        name: "Tuesday",
        time: {
          Start: "6 PM",
          End: "8:50 PM"
        }
      }
    }]
  },
  cost: 481
});


Course.find({title: OOP.title,credit:OOP.credit}, function(err, course)
  {
   if (err)
   {
     console.log(err);
   }else{
     if (course.length == 0){
       OOP.save();
     }else {
       OOP._id = course._id;
     }
   }
});



var commonFee = new CommonFees({
  tution : 160.58 ,
  technology : 9.75,
  MSCSA : 0.35,
  studentLife : 4.32,
  athletic : 1.14 ,
  parking : 4.45
});

CommonFees.find({tution: commonFee.tution,studentLife:commonFee.studentLife}, function(err, fee)
  {
   if (err)
   {
     console.log(err);
   }else{
     if (fee.length == 0){
       commonFee.save();
     }else {
       commonFee._id = fee._id;
     }
   }
});
