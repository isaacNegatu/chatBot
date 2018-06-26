/*
  pots dialogflow request action cc.getCourse.*
  
    if cc.gC.byCourseID
      request sent to ./byCourseID.js
    if cc.gC.byInstructorName
      request passed to ./byInstructorName.js
*/

let courseIDHandler = require('./byCourseID');                      
let courseInstructorHandler = require('./byInstructorName');        

module.exports = function(req, res) {
  
  let action = req.body.result.action;
  
  if (action.startsWith('cc.courses.getCourse.byCourseID')) {   //get courses in by course Id

    courseIDHandler(req,res);
    
  }else if (action.startsWith('cc.courses.getCourse.byInstructorName')){  //get courses by the name of the instructor
    
    courseInstructorHandler(req,res);      
  }
            
  
}