
let msHandler = require("./ms");
let ccHandler = require("./cc");      //century action handler



module.exports = function(req, res) {
  let action = req.body.result.action;
  
  
  // Test actions:
  if (action.startsWith('cc')) {
    
    ccHandler(req, res);
  }

  
  // Other actions:
}