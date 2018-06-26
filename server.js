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
let userHandler = require('./users');

// Use bodyParser to handle json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})


//when initializing a messenger bot, you need to verify a token
//by replying 'hub.challenge' to the request
app.get("/action", function(req, res){
    if (req.query['hub.verify_token'] === 'verified') {
      res.send(req.query['hub.challenge']);
   } else {
      res.send('Error, wrong validation token');    
   }
  
});



// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
    
  
  console.log(req.body.originalRequest);
  
  //store questions in the database
  if(req.body.originalRequest){    //if the question is coming from a platfrom other than Dialog Flow
   questionHandler(req);
   userHandler(req);
  }else{                           //if its coming from Dialg Flow
   messages.insert({question: req.body.result.resolvedQuery});
  }
  
  //handle The requests
  actionHandler(req, res);
  
});




// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});




