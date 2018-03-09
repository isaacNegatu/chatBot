let courseHandler = require("./offers");

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('test.ms.departments.offers')) {
    courseHandler(req,res);
  }
  
}