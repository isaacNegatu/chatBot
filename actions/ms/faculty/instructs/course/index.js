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

    names.forEach(function (col){
      console.log(col.name);
    });
  });

});


module.exports = async function (req, res){
  let reply = {'speech' : "The teacher doesn't exist"};
  
  console.log(req.body.result.parameters);
  
  console.log("got to courses");
  var course = req.body.result.parameters.courses.toUpperCase();
  console.log(course);
  var fName = req.body.result.parameters["given-name"];
  
  console.log(fName);
  var lName = req.body.result.parameters["last-name"];
  console.log(lName);

  

  
  var fullName = lName + ", " + fName;
  
  if (course == ""){
    var str = fullName + "teaches : ";
    
    await Faculty.findOne({name: fullName}).
            populate("coursesTaught").
            exec().
            then(c => {
              console.log(c);
              c.coursesTaught.forEach(function (d){
                console.log(c.title);
                str += c.title + "\n";
              });
            })
            .then(function (){
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
                  if(d.subject == course){
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
