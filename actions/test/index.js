module.exports = function(req, res) {
  let action = req.body.result.action;
  
  let reply = {
    'speech': `A default response`
  };
  
  if (action.startsWith('input.welcome')) {
    reply = {
      'speech': `Hello world!`
    };
  }
  
  res.status(200).json(reply);
}