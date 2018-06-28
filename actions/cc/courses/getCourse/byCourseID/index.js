let connection = require("../../../../../connection");  // import /connection.js file
let Course = require("../../../../../model/course");    // import /model/course.js file
let Faculty = require("../../../../../model/facultyStaffTest"); // import /model/facultyStaffTest file

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
  //default reply object
  let reply = {'speech' : "The course doesn't exist"};  
  
  //get course
  let course = req.body.result.parameters.courses.split('-');
  
  //split course to subject and course number
  let subject = course[0];
  let courseNumber = course[1];
  
  //get term (optional)
  let term = req.body.result.parameters.term;

  
  //if term isn't part of the request
  if(term.length == 0){
    
    
    let courseList = [];   //array to hold all the coureses
    let str = '';          //a string object to be responded to the client
   
    
    //Query the database with subject and course number
    await Course.find({ subject : subject , number : courseNumber }, function(err, docs){
      //docs -> the documents found which fulfuill the query parameters
      
      //if no document is found
      if (!docs.length){
        reply = {'speech' : 'Course not Found' };
        
      }else{   //if document or documents are found
        docs.forEach(function(co){
          //co -> each course
          
          //get all the information about each document
          let sub = co.subject;
          let num = co.number;
          let sec = co.section;
          let tit = co.title;
          let instruct = co.meetingDetails.instructor;
          let days = co.meetingDetails.days;
          let time = co.meetingDetails.time;
          let termFromDB = co.semester;

          
          //append to a string declared above
          str += `${sub}-${num}.${sec} | ${tit} | ${instruct} | ${days} | ${time} | ${termFromDB} , `; 
          
        });
        
        //get rid of comma and append a 'period' at the end
        var realStr = str.substr(0,str.length-2);
        reply = {'speech' : realStr  + "."}; 
      }
      
    });
    
    
  //if term is part of the request
  }else{
      let courseList = [];    //array to hold all the requests
      let str = '';           //a string object to be responded to the client
      let qTerm = term + ' 2018';  //a term query to match the format in the DB
    
    
      //Query the database with subject, course number and term
      await Course.find({ subject : subject , number : courseNumber, semester: qTerm}, function(err, docs){

        
        //if no document is found
        if (!docs.length){
          reply = {'speech' : 'Course not Found' };
          
          
        }else{     //if document or documents are found
          docs.forEach(function(co){
            //co -> each course
            
            //get all the information about each document
            let sub = co.subject;
            let num = co.number;
            let sec = co.section;
            let tit = co.title;
            let instruct = co.meetingDetails.instructor;
            let days = co.meetingDetails.days;
            let time = co.meetingDetails.time;
            let termFromDB = co.semester;

  
            //append to a string declared above
            str += `${sub}-${num}.${sec} | ${tit} | ${instruct} | ${days} | ${time} | ${termFromDB} , `; 

          });
          
          //get rid of comma and append a 'period' at the end
          var realStr = str.substr(0,str.length-2);
          reply = {'speech' : realStr  + "."}; 
        }

      });


    }
  
  
  
    //respond with the reply object
     res.status(200).json(reply);

}