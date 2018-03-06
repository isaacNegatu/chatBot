
let mongoose = require('mongoose');
var Course = require("../../model/course");
var CommonFees = require("../../model/commonFees");


var db = 'mongodb://Isaac:123456@ds046357.mlab.com:46357/chatbotdb';

mongoose.connect(db);

mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
}).then(function (){
  mongoose.connection.db.listCollections().toArray(function(err, names){
    if (err) console.log(err);

    names.forEach(function (col){
      console.log(col.name);
    });
  });

});




function searchDBforCourse(course){
  
}


module.exports = function(req, res) {
  let action = req.body.result.action;
  
  // console.log(req.body);
  
  var actionCommand = action.split('.');
  
  if (actionCommand[1] == "program" && actionCommand[2] == "exist"){
    console.log(req.body.result.parameters);
    searchDBforCourse(req.body.result.parameters.courses); 
  }
  //console.log(req.body);
  //console.log(req.body.result.parameters);
  // Other actions:
}