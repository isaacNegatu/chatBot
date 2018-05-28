let connection = require("../../../../../connection"); 
let Course = require("../../../../../model/course");
let Faculty = require("../../../../../model/facultyStaffTest");



module.exports = async function (req,res){
 
  let reply = {'speech' : "The teacher doesn't exist"}; 
  
  console.log(req.body.result.parameters);
  
  console.log("got to find by instructor");
  
  let course = req.body.result.parameters.courses;
  let fName = req.body.result.parameters.fName;
  
  console.log(course);
  let lName = req.body.result.parameters.lName; 
  let term = req.body.result.parameters.term;
  
  var fullName = `${lName},${fName}`;
  
  console.log(fullName);
  
  if ((course == "" || course == undefined) && term == ""){
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
      }else if (course == "" && term != ""){
        
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

        
      }
  
      res.status(200).json(reply);


  
  
}