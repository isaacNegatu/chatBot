let connection = require("../../../../connection");              //connect to the database 
let Course = require("../../../../model/course");                //course model 
let Faculty = require("../../../../model/facultyStaffTest");     //facutly model


/*

  ananymous async function (fName, lName, term, course):
    @params: fName - string - first name of the instructor  : default- ''
    @params: lName - string - last name of the instructor   : default- ''
    @params: term - string - term query for the db : default - ''
    @params: course - array - course number and course subject to be queried : default []
    
    @precondition - none
    
    @return - string - courses requested
    
    reply : string - the final reply
    
    courseList : array - used to append all the courses retrieved from the DB
    
    if course isn't provided: 
    
      Faculty.findOne(JSON {name : fullName} 
        @params name : String - full name of the instructor
        
      after the above query populate the instructor's courses  (mongoose function for retrieving referenced objects)
      
      
      then : after getting all the courses append them to the courseList array
      
      then : go through the courseList array and append all the courses corresponding 
             to the current semester to the reply string
             
    else if course is provided: 
      
      Faculty.findOne(JSON {name : fullName} 
        @params name : String - full name of the instructor
        
      after the above query populate the instructor's courses  (mongoose function for retrieving referenced objects)
      
      
      then : after getting all the courses append them to the courseList array
      
      then : go through the courseList array and append all the courses corresponding 
             to the current semester AND the course queriedto the reply string
             
    
    return reply
      
      
    
    


*/


module.exports = async function (fName = "" , lName = "" , term = "", course = []) {
  
  //a string to reply to requests
  let reply = "";
  
  //reply starter
  let str = `${fName} ${lName} teaches : `;
  
  //used to store all the courses that are retrieved from the DB
  let courseList = [];

  //course is an array
  //courese subject and course Number are stored as follows
  let courseSubject = course[0];
  let courseNumber = course[1];
  
  //full name of the instructor | for DB query purposes
  var fullName = `${lName},${fName}`;
  
  
  //course is not part of the query
  if(!courseSubject){   
    

    //find the instructor from the DB then populate all courses taught by the instrucotr
    await Faculty.findOne({name: fullName}).
            populate("coursesTaught").
            exec().
            then(c => {
             // c --> all the courses taught by the queried instructor
      
             //push all course to the courseList array
        
             c.coursesTaught.forEach(function (d){
               
               /**
               
               ***NOTE -> Code below is a saftey check for unconsistent data in the DB
               
               **/
               

                //try to find the courses in the courseList array initialized above
                let course = courseList.find(function (co){
                  return co == d.courseID;
                });

                //if the course doesn't exist already, add it to the array
                if(!course ){
                  courseList.push(d);
                }
               

              });
            })
            .then(function (){

              let flag = false;
              
              //append all the courses to a string which is going to be replied to the user
              courseList.forEach(function (co){
                //course -> each course
                
                //get all the information about the current course
                let sub = co.subject;
                let num = co.number;
                let sec = co.section;
                let tit = co.title;
                let days = co.meetingDetails.days;
                let time = co.meetingDetails.time;

                //term in the DB is in the form of 'Summer 2018' so the following code gets the term only
                let termFromDB = co.semester.split(' ')[0];

                
                //populate string of courses taught in the requested term
                if(term.toUpperCase() == termFromDB.toUpperCase()){
                  str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} | ${termFromDB} , `; 
                  flag = true;
                }
              });
      
      
            //flag is used to make sure the string isn't empty
            if(flag){
              
              
              var realStr = str.substr(0,str.length-2);
              reply = `${realStr}.`;
            }else{
              reply = `${fName} ${lName} doesn't have a schedule in the ${term}`;
            }

            })
            .catch(err => console.log(err));
    
      }else{   //If course is part of the query
        
        
        //find the instructor from the DB then populate all courses taught by the instrucotr
        await Faculty.findOne({name: fullName}).
          populate("coursesTaught").
          exec().
          then(c => {
            // c --> all the courses taught by the queried instructor
      
            //push all course to the courseList array
           c.coursesTaught.forEach(function (d){
              
             
             /**
               
             ***NOTE -> Code below is a saftey check for unconsistent data in the DB

             **/
             
             
             //try to find the courses in the courseList array initialized above
              let course = courseList.find(function (co){
                return co == d.courseID;
              });

             
              //if the course doesn't exist already, add it to the array
              if(!course ){
                courseList.push(d);
              }
     

            });
          })
          .then(function (){
          
          
            let flag = false;
          
            //append all the courses to a string which is going to be replied to the user
            courseList.forEach(function (co){
              //course -> each course
              
              //get all the information about the current course
              let sub = co.subject;
              let num = co.number;
              let sec = co.section;
              let tit = co.title;
              let days = co.meetingDetails.days;
              let time = co.meetingDetails.time;
              
              //term in the DB is in the form of 'Summer 2018' so the following code gets the term only
              let termFromDB = co.semester.split(' ')[0];
            
              //populate string of courses taught in the requested term and course
              if(term == termFromDB && sub == courseSubject && num == courseNumber){
                str += `${sub}-${num}.${sec} | ${tit} | ${days} | ${time} | ${termFromDB} , `; 
                flag = true;
              }
            })
          
          //glag is used to make sure the string isn't empty
          if(flag){
            
            var realStr = str.substr(0,str.length-2);
            reply = `${realStr}.`;
          }else{
            reply = `${fName} ${lName} doesn't teach ${courseSubject}-${courseNumber} in the ${term}`;
          }

          })
          .catch(err => console.log(err));
        
        
        
      }
        
        //return the reply
        return reply;
  
};