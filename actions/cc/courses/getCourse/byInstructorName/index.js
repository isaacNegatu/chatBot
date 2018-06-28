let getCourse = require("../courseDBquery");     //import /courseDBquery module
let os = require("os");                          //import native module used for line breaks


/* 
  getCurrentAndNextSemester()
  
    @precondition -- none
    
    gets the current date
    sets August 15 as the safezone 
    sets next year to the current year
    
    if the current date is greater than the safe zone, we'll add one more
    year to the next year since spring will be in the next year
    
    we get the start dates for all three semesters
    
    if else statement determining what the current and next semesters are
    then plug those two values in an array and return them
    
    
    
  ananymous async function (req, res)
    @param req : JSON - request, POST from client (Dialogflow)
    @param res : JSON - response, POST to client (Dialogflow)
    
    @Precondition -- post request by dialogflow webhook property - action : 'cc.courses.getCourse.byInstructorName'
    
    gets Dialogflow request
      (optional) gets 'course' from request JSON / req.body.result.parameters.courses
      gets 'fName' from request JSON / req.body.result.parameters.fName
      gets 'lName' from request JSON / req.body.result.parameters.lName
      (optional) gets 'term' from request JSON / req.body.result.parameters.term
      
    reply : JSON object to be responded with
    
    semester: gets the current and the next semester
    
    if term is provided, use the provided term, if not use the current term

    if course isn't provided:
      
      getCourse(fName, lName, queryTerm):
        @param fName - string - first name got from the request
        @param lName - string - last name got from the request
        @param queryTerm - string - the current term of the term provided
        
        @return c - string - all the courses appended together
        
      after the above function returns the string we append it to the reply 
      object and format it according to the platform which the request came from
      
      for facebook:
        reply with the info from the current semester and ask if the user would
        like to view courses from the next semester
        
      respond the the reply
        
    else if term is provided and course isn't: 
      getCourse(fName, lName, queryTerm):
        @param fName - string - first name got from the request
        @param lName - string - last name got from the request
        @param queryTerm - string - the current term of the term provided
        
        @return c - string - all the courses appended together
        
      after the above function returns the string we append it to the reply 
      object and format it according to the platform which the request came from
      
      if the requested term is the same as the next semester:
          reply with the course taught for next semester
      else if the requested term is the current term:
          reply with the courses from the curent semester and ask if the user
          would like to view courses from the next semester
      
      respond the the reply
        
    else if course is provided:
    
      getCourse(fName, lName, queryTerm, course):
        @param fName - string - first name got from the request
        @param lName - string - last name got from the request
        @param queryTerm - string - the current term of the term provided
        @param course - string - the course provided by the user
        
        @return c - string - all the courses appended together
        
      if the requested term is the same as the next semester:
        reply with the course taught for next semester
      else if the requested term is the current term:
        reply with the courses from the curent semester and ask if the user
        would like to view courses from the next semester
        
      respond with the reply

*/


//This function will return the current and next semester
function getCurrentAndNextSemester(){
  
  
  let currentDate = new Date();        //current date
  let semester = "";                   //current semester
  let nextSemester = "";               //next semester
    
  
  //fall semester safe zone (aug 15)
  let fallSemesterSafeZone = new Date (`August 15 ${currentDate.getFullYear()}`);
  
  //if the date is more the the fall safe zone,
  //next year will be the upcoming year
  //else next year will be the current year
  let nextYear = currentDate > fallSemesterSafeZone? currentDate.getFullYear()+1 : currentDate.getFullYear();
  


  //start dates for each semester
  let fallStartDate = new Date(`August 10 ${currentDate.getFullYear()}`);
  let summerStartDate = new Date(`May 12 ${nextYear}`);
  let springStartDate = new Date(`Decemeber 15 ${nextYear}`);
  
  //if else statement deciding which semester it is and setting current and next semester
  if(currentDate > fallStartDate && currentDate <= springStartDate){
    semester = "fall";
    nextSemester = "spring";
  }else if (currentDate > springStartDate && currentDate <= summerStartDate){
    semester = "spring";
    nextSemester = "summer"
  }else{
    semester = "summer";
    nextSemester = "fall";
  }
  
  
  //return current and next semester 
  return [semester, nextSemester];
}




//module exporting an async funciton
module.exports = async function (req,res){
 
  //default reply
  let reply = {'speech' : "The teacher doesn't exist"}; 
  
  
  //course is a string which is expected in a form of 'CSCI-2082' 
  //then is splitted to subject and course number
  let course = (req.body.result.parameters.courses) ? req.body.result.parameters.courses.split('-'): "";
  let courseSubject = course[0];
  let courseNumber = course[1];
  
  
  //get first name, last name and term from the request parameters
  let fName = req.body.result.parameters.fName; 
  let lName = req.body.result.parameters.lName; 
  let term = req.body.result.parameters.term;
    
  //get the current and next semester from the getCurrentAndNextSemester function
  let semesters = getCurrentAndNextSemester();
  
  //separate the current and next semester
  let currentSemester = semesters[0];
  let nextSemester = semesters[1];
  
  //if term is provided term will equal the requested term else it'll be set to the
  //current term
  let queryTerm = (term == "")? currentSemester: term;
  
    
  
  //if both course and term aren't provided by the user
  if (course.length == 0 && term.length == 0){
    
    //get course function from getcourse module
    getCourse(fName, lName, queryTerm)
      .then(c => {
        //c -> all the courses returned by the request
      
        
        //data is a dialogflow json key
      
        //if request is from facebook, the facebook bot will parse the text and the quick_replies
        //else string in the speech key will be displayed
      
        //courses will be displayed and user will be asked if they want to 
        //view courses from the next semester
      
        
        //***NOTE*** quick_replies are facebook's json keys not dialogflow's
      
      
        reply = {"data" : 
                 {
                  "facebook" : {

                      "text": `${c} ${os.EOL} ${os.EOL} Would you like to see what ${fName} teaches in the ${nextSemester}?`,
                      "quick_replies":[
                        {
                          "content_type":"text",
                          "title":"Yes",
                          "payload":`${fName} ${lName} ${nextSemester}`
                        },
                        {
                          "content_type":"text",
                          "title":"No",
                          "payload":`EndConversation`
                        }

                      ]
                    }

                  },
                  "speech" : `${c}`
                };

        //respond with the reply
        res.status(200).json(reply);
      });

    
      //if term is provided but coures isn't
      }else if (course == "" && term != ""){
        
        //get course function from getcourse module
        getCourse(fName, lName, queryTerm)
          .then(c => {
          
          
              //if query term is equal to the current semeste
              if(queryTerm.toUpperCase() == nextSemester.toUpperCase()){
               reply = {"data" : 
                     {
                      "facebook" : {

                          "text": `${c}`  ,
                        }

                      },
                      "speech" : `${c}`
                    };

            }else{
              reply = {"data" : 
                     {
                      "facebook" : {

                          "text":`${c} ${os.EOL} ${os.EOL} Would you like to check if ${fName} teaches ${courseSubject} ${courseNumber} in the ${nextSemester}?`,
                          "quick_replies": [
                            {
                              "content_type":"text",
                              "title":"Yes",
                              "payload":`${fName} ${lName} ${nextSemester} ${courseSubject}-${courseNumber}`
                            },
                            {
                              "content_type":"text",
                              "title":"No",
                              "payload":`EndConversation`
                            }

                          ]
                        }

                      },
                      "speech" : `${c}`
                    };
            }

          res.status(200).json(reply);
        });
        
       

      }else if (course != ""){

        getCourse(fName, lName, queryTerm, course)
          .then(c => {
          
            if(queryTerm.toUpperCase() == nextSemester.toUpperCase()){
               reply = {"data" : 
                     {
                      "facebook" : {

                          "text": `${c}`  ,
                        }

                      },
                      "speech" : `${c}`
                    };

            }else{
              reply = {"data" : 
                     {
                      "facebook" : {

                          "text":`${c} ${os.EOL} ${os.EOL} Would you like to check if ${fName} teaches ${courseSubject} ${courseNumber} in the ${nextSemester}?`,
                          "quick_replies": [
                            {
                              "content_type":"text",
                              "title":"Yes",
                              "payload":`${fName} ${lName} ${nextSemester} ${courseSubject}-${courseNumber}`
                            },
                            {
                              "content_type":"text",
                              "title":"No",
                              "payload":`EndConversation`
                            }

                          ]
                        }

                      },
                      "speech" : `${c}`
                    };
            }

         

          res.status(200).json(reply);
        });
        

        
      }
}