let departmentHandler = require("./department");
let facultyHandler = require("./faculty");

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('test.ms.departments')) {
    departmentHandler(req,res);
  }else if (action.startsWith('test.ms.faculty')){
    facultyHandler(req,res);
  }
  
}