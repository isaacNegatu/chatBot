
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



module.exports = async function(req, res) {
  let action = req.body.result.action;
  let reply = {};
  
  var courses = req.body.result.parameters.courses;
  console.log(courses);
  
  let actionArray = action.split('.');
 
  let course = await Course.find({subject: courses}, function (err, c){
    if (c.length ==0){
      reply = { 'speech' : `Yes Indeed`};
    console.log("hi");
    }
      
    
  });
  
  
  
  // Course.find({subject: actionArray[1]}, function(err, course)
  //     {
  //      if (err)
  //      {
  //        console.log(err);
  //      }else{
  //        reply = "yes it exits";
  //      }
  //   });
    
    res.status(200).json(reply);
}

