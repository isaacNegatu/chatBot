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
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})




// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
  
  console.log(req.body);
  
  if(req.body.payload){
    let d = JSON.parse(req.body.payload);
    console.log(d);

    res.statusCode = 302;
    res.setHeader("Location", d.response_url);
    res.status(200).json({"text" : "hi",
                         "replace_original" : false 
                         });
  }else{
    
    
    
  
  let reply = {"data" : 
               {
                "facebook" : {
                  "attachment":{
                    "type":"template",
                    "payload":{
                      "template_type":"button",
                      "text":"Please choose the semester",
                      "buttons":[
                        {
                          "type":"postback",
                          "title":"fall",
                          "payload":"fall"
                        },
                         {
                          "type":"postback",
                          "title":"spring",
                          "payload":"spring"
                        },
                         {
                          "type":"postback",
                          "title":"summer",
                          "payload": "summer"
                        }
                      ]
                    }
                  }
                }
                
              },
               "speech" : "hi"
            };
  
  res.status(200).json(reply);
  }
    
  // if(req.body.originalRequest){
  //  questionHandler(req);
  // }else{
  //  messages.insert({question: req.body.result.resolvedQuery});
  // }
  // // Save message in database
  // actionHandler(req, res);
  
});




// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});




