let connection = require("../../../../../connection"); 
let Course = require("../../../../../model/course");
let Faculty = require("../../../../../model/facultyStaffTest");


module.exports = async function (req, res){
  let reply = {'speech' : "The course doesn't exist"};  
  
  console.log(req.body.result.parameters);

  console.log('got to course Id stuff');
  
  let course = req.body.result.parameters.courses.split('-');
  let term = req.body.result.parameters.term;

  if(term.length == 0){
    let courseList == [];
   
    await Course.find({ 
    
  }
}