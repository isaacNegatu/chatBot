let getCourse = require('./getCourse');   

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('cc.courses.getCourse')) {
    getCourse(req,res);
  }
  
}