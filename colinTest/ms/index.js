



module.exports = function(req, res) {
  let action = req.body.result.action;
  
  var actionCommand = action.split('.');
  console.log(actionCommand);
  if (actionCommand[1] == "course" && actionCommand[2] == "exists"){
     //searchDBforCourse(); 
  }
  //console.log(req.body);
  console.log(req.body.result.parameters);
  // Other actions:
}