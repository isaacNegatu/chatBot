let connection = require("../../../../../connection"); 
let Course = require("../../../../../model/course");
let Faculty = require("../../../../../model/facultyStaffTest");



module.exports = async function (req,res){
 
  let reply = {'speech' : "The teacher doesn't exist"}; 
  
  console.log(req.body.result.parameters);
  
  console.log("got to find by instructor");
  
  let course = (req.body.result.parameters.courses) ? req.body.result.parameters.courses.split('-'): "";
  let fName = req.body.result.parameters.fName;  
  let lName = req.body.result.parameters.lName; 
  let term = req.body.result.parameters.term;
    
  var fullName = `${lName},${fName}`;

  
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
                  let termFromDB = co.semester.split(' ')[0];
                  
                  str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} | ${termFromDB} ,`;      
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

              if(!course ){
                courseList.push(d);
              }
              console.log(d.title);

            });
          })
          .then(function (){
          
            let flag = false;
          
            courseList.forEach(function (co){
              let sub = co.subject;
              let num = co.number;
              let sec = co.section;
              let tit = co.title;
              let days = co.meetingDetails.days;
              let time = co.meetingDetails.time;
              
              let termFromDB = co.semester.split(' ')[0];
            
              if(term == termFromDB){
                str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} | ${termFromDB} , `; 
                flag = true;
              }
            })
          
          if(flag){
            
            var realStr = str.substr(0,str.length-2);
            reply = {'speech' : realStr  + "."};
          }else{
            reply = {'speech' : `${fName} ${lName} doesn't have a schedule in the ${term}`};
          }

          })
          .catch(err => console.log(err));

        
      }else if (course != "" && term != ""){
        
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

              if(!course ){
                courseList.push(d);
              }
              console.log(d.title);

            });
          })
          .then(function (){
          
            let flag = false;
          
            courseList.forEach(function (co){
              let sub = co.subject;
              let num = co.number;
              let sec = co.section;
              let tit = co.title;
              let days = co.meetingDetails.days;
              let time = co.meetingDetails.time;
              
              let termFromDB = co.semester.split(' ')[0];
            
              if(term == termFromDB && sub == course[0] && num == course[1]){
                str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} | ${termFromDB} , `; 
                flag = true;
              }
            })
          
          if(flag){
            
            var realStr = str.substr(0,str.length-2);
            reply = {'speech' : realStr  + "."};
          }else{
            reply = {'speech' : `${fName} ${lName} doesn't have a schedule in the ${term}`};
          }

          })
          .catch(err => console.log(err));

        
      }else if (course != "" && term == ""){
        
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

              if(!course ){
                courseList.push(d);
              }
              console.log(d.title , d.subject, d.number, d.section);

            });
          })
          .then(function (){
          
            let flag = false;
          
            courseList.forEach(function (co){
              let sub = co.subject;
              let num = co.number;
              let sec = co.section;
              let tit = co.title;
              let days = co.meetingDetails.days;
              let time = co.meetingDetails.time;
              
              let termFromDB = co.semester.split(' ')[0];
            
              if(sub == course[0] && num == course[1]){
                str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} | ${termFromDB} , `; 
                flag = true;
              }
            })
          
          if(flag){
            
            var realStr = str.substr(0,str.length-2);
            reply = {'speech' : realStr  + "."};
          }else{
            reply = {'speech' : `${fName} ${lName} doesn't teach ${course[0]}-${course[1]}`};
          }

          })
          .catch(err => console.log(err));

        
      }
  
      //you need to build urls for all the available options
      res.status(200).json(reply);
      console.log('------------------------------------------------------------------------------------------------------------------');
      console.log(res);


}