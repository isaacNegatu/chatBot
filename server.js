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

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})




// The API endpoint for the requests from Dialog Flow
app.post("/action", function (req, res) {
  
  console.log(req);
  
  let reply = {"data" : {
                "slack" : {
                    "text": "New comic book alert!",
                    "attachments": [
                        {
                            "title": "The Further Adventures of Slackbot",
                            "fields": [
                                {
                                    "title": "Volume",
                                    "value": "1",
                                    "short": true
                                },
                                {
                                    "title": "Issue",
                                    "value": "3",
                            "short": true
                                }
                            ],
                            "author_name": "Stanford S. Strickland",
                            "author_icon": "http://a.slack-edge.com/7f18https://a.slack-edge.com/bfaba/img/api/homepage_custom_integrations-2x.png",
                            "image_url": "http://i.imgur.com/OJkaVOI.jpg?1"
                        },
                        {
                            "title": "Synopsis",
                            "text": "After @episod pushed exciting changes to a devious new branch back in Issue 1, Slackbot notifies @don about an unexpected deploy..."
                        },
                        {
                            "fallback": "Would you recommend it to customers?",
                            "title": "Would you recommend it to customers?",
                            "callback_id": "comic_1234_xyz",
                            "color": "#3AA3E3",
                            "attachment_type": "default",
                            "actions": [
                                {
                                    "name": "recommend",
                                    "text": "Recommend",
                                    "type": "button",
                                    "value": "recommend"
                                },
                                {
                                    "name": "no",
                                    "text": "No",
                                    "type": "button",
                                    "value": "bad"
                                }
                            ]
                        }
                    ]
                }
              },
               "speech" : "hello"
              };
  
  res.status(200).json(reply);
    
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




