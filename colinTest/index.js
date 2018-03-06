

let minnesotaState = require('./ms');
let specificCollege = require('./specificCollege');


module.exports = function(req, res) {
  let action = req.body.result.action;
  
  // Test handling:
  if (action.startsWith('ms')) {
    minnesotaState(req, res);
  }
  
  else{
   specificCollege(req, res);
  }
  
}
