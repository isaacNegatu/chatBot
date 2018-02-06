// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var db = require('monk')(process.env.MONGODB_URI);
var messages = db.get('messages');

var apiaiHandler = require('./actions');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/apiai", function (request, response) {
  console.log(request.body);
  messages.insert(request.body);
  apiaiHandler(request, response, farconData);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
