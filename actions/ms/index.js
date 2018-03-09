let departmentHandler = require("./department");

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('test.ms.departments')) {
    departmentHandler(req,res);
  }
  
}