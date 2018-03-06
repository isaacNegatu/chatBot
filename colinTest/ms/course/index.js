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
      console.log(col.name);
    });
  });

});






module.exports = function(req, res) {
  var reply = "";
  // console.log(req.body.result);
  var course = req.body.result.parameters.courses;
  console.log(course);
  Course.find({subject: course}, function(err, course)
      {
       if (err)
       {
         console.log(err);
         
       }else{
         reply = "yes it exits";
         console.log(reply);
         res.status(200).json(reply);
       }
  
    });
  
  
}
