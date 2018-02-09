
module.export = function (req, res){
  
  let action = req.body.result.action;
  
  let reply = { 'speech' : `cannot access` }
  
  if (action.startsWith('address.home')){
      
      reply = { 'speech' : `123 main street`}
      
      }
  
    }