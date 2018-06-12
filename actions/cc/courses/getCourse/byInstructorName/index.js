let getCourse = require("../courseDBquery");     //custom module to query db
let os = require("os");                          //use for link breaks in platform replies





//This function will return the current and next semester
function getCurrentSemester(n){
  let currentDate = new Date();
  let semester = "";
  let nextSemester = "";
    
  let fallSemesterSafeZone = new Date (`August 15 ${currentDate.getFullYear()}`);
  let nextYear = currentDate.getFullYear();
  
  if (currentDate > fallSemesterSafeZone){
    nextYear++;
  }

  let fallStartDate = new Date(`August 10 ${currentDate.getFullYear()}`);
  let summerStartDate = new Date(`May 12 ${nextYear}`);
  let springStartDate = new Date(`Decemeber 15 ${nextYear}`);
  
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
   
  return [semester, nextSemester];
}





module.exports = async function (req,res){
 
  //default reply
  let reply = {'speech' : "The teacher doesn't exist"}; 
  
  
  //course is a string which is expected in a form of 'CSCI-2082' 
  //then is splitted to subject and course number
  let course = (req.body.result.parameters.courses) ? req.body.result.parameters.courses.split('-'): "";
  let courseSubject = course[0];
  let courseNumber = course[1];
  
  
  let fName = req.body.result.parameters.fName; 
  let lName = req.body.result.parameters.lName; 
  let term = req.body.result.parameters.term;
    
  //database format
  var fullName = `${lName},${fName}`;
  
  let semesters = getCurrentSemester();
  
  let currentSemester = semesters[0];
  let nextSemester = semesters[1];
  
  let queryTerm = (term == "")? currentSemester: term;
  
  
  console.log(currentSemester + " " + nextSemester);
  
  
  if (course.length == 0 && term.length == 0){
    
    console.log('-----------------------------------------------------------------------------------------------------------------------');
        
    getCourse(fName, lName, queryTerm)
      .then(c => {
      
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
                  "speech" : `${c} <a href = "google.com" > google </a>`
                };

        res.status(200).json(reply);
      });

      }else if (course == "" && term != ""){
        
        getCourse(fName, lName, queryTerm)
          .then(c => {

          reply = {"data" : 
                   {
                    "facebook" : {
                        "text": `${c}`
                      }

                    },
                    "speech" : `${c}`
                  };

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