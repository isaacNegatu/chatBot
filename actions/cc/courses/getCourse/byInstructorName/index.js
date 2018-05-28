let connection = require("../../../../../connection"); 
let Course = require("../../../../../model/course");
let Faculty = require("../../../../../model/facultyStaffTest");



module.exports = async function (req,res){
 
  let reply = {'speech' : "The teacher doesn't exist"}; 
  
  console.log(req.body.result.parameters);
  
  console.log("got to courses");
  
  
  
}