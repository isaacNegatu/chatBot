let mongoose = require('mongoose');
var Course = require("../../../../../model/course");
var Faculty = require("../../../../../model/facultyStaffTest");


var db = process.env.MONGODB_URI;
 
mongoose.connect(db);

mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
}).then(function (){
  mongoose.connection.db.listCollections().toArray(function(err, names){
    if (err) console.log(err);
  });

});


module.exports = async function (req, res){
  let reply = {'speech' : "The teacher doesn't exist"};
  
  console.log(req.body.result.parameters);
  
  console.log("got to courses");
  var course = req.body.result.parameters.courses;
  var fName = req.body.result.parameters["given-name"];
 console.log(course);
  var lName = req.body.result.parameters["last-name"];

  

  
  var fullName = lName + ", " + fName;
  console.log(fullName);
  if (course == ""){
    var str = fullName + " teaches : ";
    var courseList = [];
    
    await Faculty.findOne({name: fullName}).
            populate("coursesTaught").
            exec().
            then(c => {
              c.coursesTaught.forEach(function (d){
                let course = courseList.find(function (co){
                  return co == d.title;
                });
                
                if(!course){
                  courseList.push(d.title);
                }
                console.log(d.title);
                
              });
            })
            .then(function (){
              courseList.forEach(function (co){
                str += co + ", ";
              })
              Y
              reply = {'speech' : str};
      
            })
            .catch(err => console.log(err));
    }else{
      
      var str = "";
      
      await Faculty.findOne({name: fullName}).
              populate("coursesTaught").
              exec().
              then(c => {
              if (c != null){
                c.coursesTaught.forEach(function (d){
                  if(d.title == course){
                    str = "Yes, " + fullName + " teaches " + course;
                  }
                });
              } 
              }).
              then(function (){
                if (str == ""){
                 var noTeach = "No " + fullName + " does not teach " + course; 
                 reply = {'speech' : noTeach};
                }else{
                 reply = {'speech' : str};
                }
              }).
              catch(err => console.log(err));
       }
  
  
        res.status(200).json(reply);

}
