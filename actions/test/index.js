module.exports = function(req, res) {
  let action = req.body.result.action;
  let reply = {
    'speech': '
  }
  if (action.startsWith('test.hello')) {
    reply = {
      'speech': `Hello world!`
    };
  }
}