let mongoose = require('mongoose');
var Course = require("../../../model/course");
var CommonFees = require("../../../model/commonFees");


var db = 'mongodb://Isaac:123456@ds046357.mlab.com:46357/chatbotdb';

mongoose.connect(db);

mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
}).then(function (){
  mongoose.connection.db.listCollections().toArray(function(err, names){
    if (err) console.log(err);

    names.forEach(function (col){
      //console.log(col.name);
    });
  });

});






module.exports = function(req, res) {
  var reply = "";
  // console.log(req.body.result);
  var course = req.body.result.parameters.courses;
  console.log(course);
  
  
  function respond(response, res){
    console.log('3');
    res.status(200).json(response);
  }
  
  function searchDB(course, res, callback){
    console.log('1');
    Course.find({subject: course}, function(err, course)
      {
       if (err)
       {
         console.log(err);
         
       }else{
         console.log('2');
         reply = "yes it exits";
         callback(reply, res);
       }
    });
  }
  
  searchDB(course, respond);
  
}
