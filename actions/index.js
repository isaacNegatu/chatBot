let testHandler = require('./test');

module.exports = function(req, res) {
  let action = req.body.result.action;
  if (action.startsWith('test')) {
    testHandler(req, res);
  }
}