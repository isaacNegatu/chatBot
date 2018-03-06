
let mongoose = require('mongoose');

function searchDBforCourse(course){
  
}


module.exports = function(req, res) {
  let action = req.body.result.action;
  
  // console.log(req.body);
  
  var actionCommand = action.split('.');
  console.log(actionCommand[2]);
  if (actionCommand[1] == "program" && actionCommand[2] == "exist"){
    console.log(req.body.result.parameters);
    searchDBforCourse(req.body.result.parameters.courses); 
  }
  //console.log(req.body);
  //console.log(req.body.result.parameters);
  // Other actions:
}