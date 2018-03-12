let connection = require("../../../../../connection"); 
var Course = require("../../../../../model/course");
var Faculty = require("../../../../../model/facultyStaffTest");



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
  if (lName.length !== 0  && fName.length !== 0){
    
    if (course == "" ){
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
                var realStr = str.substr(0,str.length-2);
                reply = {'speech' : realStr  + "."};

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
  }
  
  
        if (lName.length === 0 ){
          reply = {"speech" : "Please provide the last name"}
          res.status(200).json(reply);

        }else if (fName.length === 0){
          reply = {"speech" : "Please provide the first name"}
          res.status(200).json(reply);

        }else{
            res.status(200).json(reply);
        }
  

}
