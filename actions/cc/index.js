let courseHandler = require('./courses');

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('cc.courses')) {
    courseHandler(req,res);
  }
  
}