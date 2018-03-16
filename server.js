// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let connection = require("./connection");

// Create a simple connection to the MONGODB database
// to store messages.
let monk = require('monk');
let db = monk(process.env.MONGODB_URI);
let messages = db.get('questions');

let actionHandler = require('./actions');
let questionHandler = require('./question');

// Use bodyParser to handle json
app.use(bodyParser.json());






// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
  
  
  if(req.body.originalRequest){
   questionHandler(req);
  }else{
   messages.insert({question: req.body.result.resolvedQuery});
  }
  // Save message in database
  actionHandler(req, res);
  
});




// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



let colinTest = require('./colinTest');

// dialog flow handling test - Colin Roskos
app.post("/df-request", function (req, res) {
  console.log("in colin test...");
  colinTest(req, res);
  console.log("end colin test");
});






