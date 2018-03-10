let courseHandler = require("./course");

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('test.ms.faculty.instructs.course')) {
        console.log("got to instructs");

    courseHandler(req,res);
  }
  
}