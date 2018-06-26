let getCourse = require('./getCourse');   

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  //if its a query prompting the retrive a course go to the getCourse handler
  if (action.startsWith('cc.courses.getCourse')) {
    getCourse(req,res);
  }
  
}