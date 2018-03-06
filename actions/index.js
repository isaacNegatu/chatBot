let testHandler = require('./test');
let addressHandler = require("./address");

let courseHandler = require("./course");
let feesHandler = require("./fees");



module.exports = function(req, res) {
  let action = req.body.result.action;
  
  // Test actions:
  if (action.startsWith('course')) {
    courseHandler(req, res);
  }
  
  if(action.startsWith('input')){
   testHandler(req, res);
  }
  
  // Other actions:
}