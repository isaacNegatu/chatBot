let courseIDHandler = require('./byCourseID');                      //get courses in by course Id
let courseInstructorHandler = require('./byInstructorName');        //get courses by the name of the instructor

module.exports = function(req, res) {
  
  let action = req.body.result.action;
  
  if (action.startsWith('cc.courses.getCourse.byCourseID')) {
    courseIDHandler(req,res);
  }else if (action.startsWith('cc.courses.getCourse.byInstructorName')){
    courseInstructorHandler(req,res);      
  }
            
  
}