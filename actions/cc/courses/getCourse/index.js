let courseIDHandler = require('./byCourseID');
let courseInstructorHandler = require('./byInstructorName');

module.exports = function(req, res) {
  
  let action = req.body.result.action;
  
  if (action.startsWith('cc.courses.getCourse.byCourseID')) {
    courseIDHandler(req,res);
  }else if (action.startsWith('cc.courses.getCourse.byInstructorName')){
    courseInstructorHandler(req,res);      
  }
            
  
}