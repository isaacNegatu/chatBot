// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

var db = 'mongodb://Isaac:123456@ds046357.mlab.com:46357/chatbotdb';

mongoose.connect(db);

mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
});



let actionHandler = require('./actions');

// Use bodyParser to handle json
app.use(bodyParser.json());

// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
  
  
  //messages.insert(req.body.result);
  
  // Save message in database
  actionHandler(req, res);
  
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
