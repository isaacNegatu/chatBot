
let mongoose = require("mongoose");
var Course = require("./model/course");
var testStaff = require("./model/facultyStaffTest")


var db = "mongodb://Isaac:123456@ds046357.mlab.com:46357/chatbotdb";

mongoose.connect(db);

mongoose.connection
  .on("open", function() {
    console.log("connected to mongo successfully");
  })
  .then(function() {
    mongoose.connection.db.listCollections().toArray(function(err, names) {
      if (err) console.log(err);
    });
  }).then(async function() {

    testStaff.find({name: "Murphy, Marlin"}, function (err, doc){
      console.log(doc._id);
    })

    var flag = true;
    var savedIDs = [];
    var count = 0;

    await Course.find({}, function (err, c){
      c.forEach(function (doc){
    
        testStaff.find({name: doc.instructor}, function(err, staff){
          if (err) console.log(err);
    
          console.log(staff.name);
    
          if(staff.name != undefined){
            flag = false;
            console.log(staff.coursesTaught)
    
            staff.coursesTaught.forEach(function(c){
              savedIDs.push(c.coursesTaught._id);
    
            });
          }
        }).then(function (){
    
          savedIDs.push(doc._id);
          if (!flag){
            testStaff.findOneAndUpdate({name: doc.instructor}, {coursesTaught: savedIDs},function (err, doc){
              if (err) console.log(err);
              console.log("ids Updated")
            });
          }else{
            var currentFaculty = new testStaff({
              name: doc.instructor,
              id: [doc._id]
            });
    
            currentFaculty.save();
          }
        });
      });
    
    });
  });
