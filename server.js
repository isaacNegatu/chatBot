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

// Use bodyParser to handle json
app.use(bodyParser.json());

function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};


// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
  messages.insert({question: req.body.result.resolvedQuery});
  var ip = getClientIp(req);
  console.log(req.originalRequest.data);
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






