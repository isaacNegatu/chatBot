var Question = require('../model/platformQuestions'); 



module.exports = function (req){ 
  console.log(req.body);
  var newQuestion = new Question({
    platform: req.body.originalRequest.source,
    id_fromPlatfrom: req.body.originalRequest.data.user,
    date : new Date(),
    question: req.body.result.resolvedQuery
  });
  
  newQuestion.save();
}




