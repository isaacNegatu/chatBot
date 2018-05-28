
let msHandler = require("./ms");
let ccHandler = require("./cc");



module.exports = function(req, res) {
  let action = req.body.result.action;
  console.log("got to actions");
  // Test actions:
  if (action.startsWith('cc')) {
    
    ccHandler(req, res);
  }

  
  // Other actions:
}