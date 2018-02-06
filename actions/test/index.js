module.exports = function(req, res) {
  let action = req.body.result.action;
  
  let reply = {
    'speech': `A default response`
  };
  
  if (action.startsWith('test.hello')) {
    reply = {
      'speech': `Hello ${user.name}!`
    };
  }
  
  res.status(200).json(reply);
}