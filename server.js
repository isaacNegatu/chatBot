// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// Create a simple connection to the MONGODB database
// to store messages.
let db = require('monk')(process.env.MONGODB_URI);
let messages = db.get('messages');

let actionHandler = require('./actions');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Use bodyParser to handle json
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// This is an example route for serving a web page
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// The API endpoint for the requests from Dialog Flow
app.post("/action", function (request, response) {
  console.log(request.body);
  messages.insert(request.body); // Save message in database
  actionHandler(request, response);
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
