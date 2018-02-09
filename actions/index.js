let testHandler = require('./test');

module.exports = function(req, res) {
  let action = req.body.result.action;
  
  // Test actions:
  if (action.startsWith('input')) {
    testHandler(req, res);
  }
  
  // Other actions:
}