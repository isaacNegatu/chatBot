
let msHandler = require("./ms");



module.exports = function(req, res) {
  let action = req.body.result.action;
  console.log("got to actions");
  // Test actions:
  if (action.startsWith('test.ms')) {
    
    msHandler(req, res);
  }

  
  // Other actions:
}