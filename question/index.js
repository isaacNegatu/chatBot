var Question = require('../model/platformQuestions'); 

var platform = "";
var platform_id = "";
var question = "";


module.exports = function (req){ 
  console.log(req.body);
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
    console.log(platform_id);
    
    var newQuestion = new Question({
      platform: platform,
      platform_id: platform_id,
      date : new Date(),
      question: question
    });
  
    newQuestion.save();
    
  });
  
}




