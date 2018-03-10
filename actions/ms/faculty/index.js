let instructHandler = require("./instructs");

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  if (action.startsWith('test.ms.faculty.instructs')) {
        console.log("got to faculty");

    instructHandler(req,res);
  }
  
}