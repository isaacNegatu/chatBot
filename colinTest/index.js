

let minnesotaState = require('./ms');
let specificCollege = require('./specificCollege');


module.exports = function(req, res) {
  console.log("here");
  let action = req.body.result.action;
  
  // Test handling:
  if (action.startsWith('ms')) {
    console.log("made it here");
    minnesotaState(req, res);
  }
  
  else{
   specificCollege(req, res);
  }
  
}
