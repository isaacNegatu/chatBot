var Question = require('../model/platformQuestions'); 

var platform = "";
var platform_id = "";
var question = "";


module.exports = function (req){ 
  
  let getRequestInfo = function() {
      return new Promise(function(resolve, reject) {
        platform = req.body.originalRequest.source;
        platform_id = req.body.originalRequest.user;
        question = req.body.result.resolvedQuery
      });
    };
  
  getRequestInfo()
  .then(function(){
    console.log("got here");
    
    var newQuestion = new Question({
      platform: platform,
      id_fromPlatfrom: platform_id,
      date : new Date(),
      question: question
    });
  
    newQuestion.save();
    
  });
  
}




