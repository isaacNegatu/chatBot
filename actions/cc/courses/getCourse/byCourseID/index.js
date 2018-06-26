let connection = require("../../../../../connection");  // import ./connection.js file
let Course = require("../../../../../model/course");    // import ./model/course.js file
let Faculty = require("../../../../../model/facultyStaffTest"); //import ./model/facultyStaffTest file

/*
  anonymous async function (req, res)
    @param req : JSON - request, POST from client (Dialogflow)
    @param res : JSON - response, POST to client (Dialogflow)
  
  @Precondition -- post request by dialogflow webhook property - action : 'cc.courses.getCourse.byCourseID'
      
  gets Dialogflow request
    gets 'course' from request JSON / req.body.result.parameters.courses
    (optional) gets 'term' from request JSON / req.body.result.parameters.term
  
  reply : JSON object to be responded with
  
  if term does not exists:
    Course.find(JSON {subject: subject, number: courseNumber}, anonCallback) // mongoose model for mongoDB access
      @param JSON {
              subject : String - subject name
              number : String - course number
              semester : String - term
            }
      
      if searched course doesn't exist:
        reply = 'doesn't exist'
        
      else:
        for all Course:
          reply += course values
          
  else:
    Course.find(JSON {subject: subject, number: courseNumber, semester: qTerm}, anonCallback) // mongoose model for mongoDB access
      @param JSON {
              subject : String - subject name
              number : String - course number
              semester : String - term
            }
      
      if searched course doesn't exist:
        reply = 'doesn't exist'
        
      else:
        for all Course:
          reply += course values
  
  appends respose with response JSON

*/


module.exports = async function (req, res){
  let reply = {'speech' : "The course doesn't exist"};  
  
  console.log(req.body.result.parameters);

  console.log('got to course Id stuff');
  
  let course = req.body.result.parameters.courses.split('-');
  let subject = course[0];
  let courseNumber = course[1];
  
  let term = req.body.result.parameters.term;

  if(term.length == 0){
    let courseList = [];
    let str = '';
   
    await Course.find({ subject : subject , number : courseNumber }, function(err, docs){
      
      if (!docs.length){
        reply = {'speech' : 'Course not Found' };
      }else{
        docs.forEach(function(co){
          let sub = co.subject;
          let num = co.number;
          let sec = co.section;
          let tit = co.title;
          let instruct = co.meetingDetails.instructor;
          let days = co.meetingDetails.days;
          let time = co.meetingDetails.time;
          let termFromDB = co.semester;

          
          str += `${sub}-${num}.${sec} | ${tit} | ${instruct} | ${days} | ${time} | ${termFromDB} , `; 
          
        });
        var realStr = str.substr(0,str.length-2);
        reply = {'speech' : realStr  + "."}; 
      }
      
    });
    
  }else{
      let courseList = [];
      let str = '';
      let qTerm = term + ' 2018';
      await Course.find({ subject : subject , number : courseNumber, semester: qTerm}, function(err, docs){

        if (!docs.length){
          reply = {'speech' : 'Course not Found' };
        }else{
          docs.forEach(function(co){
            let sub = co.subject;
            let num = co.number;
            let sec = co.section;
            let tit = co.title;
            let instruct = co.meetingDetails.instructor;
            let days = co.meetingDetails.days;
            let time = co.meetingDetails.time;
            let termFromDB = co.semester;


            str += `${sub}-${num}.${sec} | ${tit} | ${instruct} | ${days} | ${time} | ${termFromDB} , `; 

          });
          var realStr = str.substr(0,str.length-2);
          reply = {'speech' : realStr  + "."}; 
        }

      });


    }
  
     res.status(200).json(reply);

}