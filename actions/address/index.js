
module.exports = function (req, res){
  
  let action = req.body.result.action;
  
  let reply = { 'speech' : `cannot access` };
  
  if (action.startsWith('address.house')){
      
      reply = { 'speech' : `123 main street`};
      
      }
  
  res.status(200).json(reply);
  
  }