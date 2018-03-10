let courseHandler = require("./course");

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('test.ms.faculty.instructs.course')) {
    courseHandler(req,res);
  }
  
}