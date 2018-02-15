// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// Create a simple connection to the MONGODB database
// to store messages.
let monk = require('monk');

let extend = require('

let db = monk(process.env.MONGODB_URI);

let messages = db.get('Colleges');



let actionHandler = require('./actions');

// Use bodyParser to handle json
app.use(bodyParser.json());

// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
  
  
  messages.insert(req.body.result);
  
  // Save message in database
  actionHandler(req, res);
  
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
