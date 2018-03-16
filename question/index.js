var Question = require('../model/platformQuestions'); 



module.exports = function (req){ 
  
  var newQuestion = new Question({
    platform: req.body.originalRequest.data.source,
    id_fromPlatfrom: req.body.originalRequest.data.user,
    date : new Date(),
    question: req.body.result.resolvedQuery
  });
  
  newQuestion.save();
}




