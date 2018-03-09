// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');



// Create a simple connection to the MONGODB database
// to store messages.
let monk = require('monk');

let db = monk(process.env.MONGODB_URI);

let messages = db.get('questions');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
}).then(function (){
  mongoose.connection.db.listCollections().toArray(function(err, names){
    if (err) console.log(err);

    names.forEach(function (col){
      //console.log(col.name);
    });
  });

});


let actionHandler = require('./actions');

// Use bodyParser to handle json
app.use(bodyParser.json());


// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
  messages.insert(req.body.result.metadata);

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






