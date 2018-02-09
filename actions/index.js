let testHandler = require('./test');
let addressHandler = require("./address");

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  // Test actions:
  if (action.startsWith('input')) {
    testHandler(req, res);
  }
  
  if(action.startsWith('address')){
    addressHandler(req, res);
  }
  
  // Other actions:
}