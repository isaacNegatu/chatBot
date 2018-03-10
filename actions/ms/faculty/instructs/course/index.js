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
  
  var fName = req.body.result.parameters.attributes["given-name"];
  
  console.log(fName);
  var lName = req.body.result.parameters.attributes["last-name"];
  
  

  
  var fullName = lName + ", " + fName;
  
  if (course == ""){
    var str = fullName + "teaches : ";
    
    await Faculty.findOne({name: fullName}).
            populate("coursesTaught").
            exec().
            then(c => {
              console.log(c);
              // c.forEach(function (d){
              //   console.log(c.title);
              //   str += c.title + "\n";
              // });
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
                c.forEach(function (d){
                  if(d.title == course){
                    str = "Yes, " + fullName + " teaches " + course;
                  }
                });
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
