let connection = require("../../../../connection"); 
let Course = require("../../../../model/course");
let Faculty = require("../../../../model/facultyStaffTest");



module.exports = async function (fName = "" , lName = "" , term = "", course = "") {
  
  let reply = "";
  
  console.log(fName, lName);
  
  let str = `${fName} ${lName} teaches : `;
  let courseList = [];

  
  var fullName = `${lName},${fName}`;
  
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
            reply = `${realStr} .`;
          }else{
            reply = `${fName} ${lName} doesn't have a schedule in the ${term}`;
          }

          })
          .catch(err => console.log(err));
        
        return reply;
  
};