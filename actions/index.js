let testHandler = require('./test');
let addressHandler = require("./address");

let courseHandler = require("./course");
let feesHandler = require("./fees");

let msHandler = require("./ms");



module.exports = function(req, res) {
  let action = req.body.result.action;
  console.log("got to actions");
  // Test actions:
  if (action.startsWith('test.ms')) {
    
    msHandler(req, res);
  }
  
  if(action.startsWith('input')){
   testHandler(req, res);
  }
  
  // Other actions:
}