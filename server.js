// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

let db = require('monk')(process.env.MONGODB_URI);
let messages = db.get('messages');

let actionHandler = require('./actions');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/action", function (request, response) {
  console.log(request.body);
  messages.insert(request.body);
  actionHandler(request, response);
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
