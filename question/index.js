/** 
  This module will save questions if they are coming from a source
  other than DialogFlow. 

**/

//Using the model 'platformQuestions'
var Question = require('../model/platformQuestions'); 

//initializing variables to be used to insert to the db later in the program
var platform = "";
var platform_id = "";
var question = "";


//exporting the module so that it can be used called from the server.js file
// Note that it doesn't have a response parameter because we will only be inserting
// data to the DB
module.exports = function (req){ 
  
  
  //This variable will make sure that we get all the fields necessary to 
  //insert to the DB
  let getRequestInfo = function() {
      return new Promise(function(resolve, reject) {
        platform = req.body.originalRequest.source;
        platform_id = req.body.originalRequest.data.user;
        question = req.body.result.resolvedQuery;
        resolve();
      });
    };
  
  getRequestInfo()
  .then(function(){

    //Creating a new question object with the current time and date
    var newQuestion = new Question({
      platform: platform,
      platform_id: platform_id,
      date : new Date(),
      question: question
    });
  
    //Saving the question to the db
    newQuestion.save();
    
  });
  
}




