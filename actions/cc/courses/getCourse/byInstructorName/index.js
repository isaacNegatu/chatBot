let connection = require("../../../../../connection"); 
let Course = require("../../../../../model/course");
let Faculty = require("../../../../../model/facultyStaffTest");



module.exports = async function (req,res){
 
  let reply = {'speech' : "The teacher doesn't exist"}; 
  
  console.log(req.body.result.parameters);
  
  console.log("got to find by instructor");
  
  let course = req.body.result.parameters.courses;
  let fName = req.body.result.parameters.fName;
  
  console.log(course.length);
  
  let lName = req.body.result.parameters.lName; 
  let term = req.body.result.parameters.term;
  
  console.log(term);
  
  var fullName = `${lName},${fName}`;
  
  console.log(fullName);
  
  if (course.length == 0 && term.length == 0){
      var str = `${fName} ${lName} teaches : `;
      var courseList = [];

      await Faculty.findOne({name: fullName}).
              populate("coursesTaught").
              exec().
              then(c => {
                 
               c.coursesTaught.forEach(function (d){
                 
                 
                  let course = courseList.find(function (co){
                    return co == d.courseID;
                  });

                  if(!course){
                    courseList.push(d);
                  }
                  console.log(d.title);

                });
              })
              .then(function (){
                courseList.forEach(function (co){
                  let sub = co.subject;
                  let num = co.number;
                  let sec = co.section;
                  let tit = co.title;
                  let days = co.meetingDetails.days;
                  let time = co.meetingDetails.time;
                  let term = co.semester.split(' ')[0];
                  
                  str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} | ${term} ,`;      
                })
                var realStr = str.substr(0,str.length-2);
                reply = {'speech' : realStr  + "."};

              })
              .catch(err => console.log(err));
      }else if (course == "" && term != ""){
        
        var str = `${fName} ${lName} teaches : `;
        var courseList = [];

        await Faculty.findOne({name: fullName}).
          populate("coursesTaught").
          exec().
          then(c => {

           c.coursesTaught.forEach(function (d){
              
              let course = courseList.find(function (co){
                return co == d.courseID;
              });

              if(!course){
                courseList.push(d);
              }
              console.log(d.title);

            });
          })
          .then(function (){
            courseList.forEach(function (co){
              let sub = co.subject;
                  let num = co.number;
                  let sec = co.section;
                  let tit = co.title;
                  let days = co.meetingDetails.days;
                  let time = co.meetingDetails.time;
                  
                  str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} , `;  
            })
            var realStr = str.substr(0,str.length-2);
            reply = {'speech' : realStr  + "."};

          })
          .catch(err => console.log(err));

        
      }
  
      res.status(200).json(reply);


  
  
}