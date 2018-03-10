
let mongoose = require('mongoose');
var Course = require("../../../../model/course");

var db = process.env.MONGODB_URI;
 
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
  
  var course = req.body.result.parameters.courses.toUpperCase();
  var college = req.body.result.parameters.College;
  
  var flag = false;
  var collegeList = [];
  
  if(college == ""){
    
    await Course.find({subject: course}, function (err, li){
      
      console.log(li);
      li.forEach(function (mydoc){
        
        collegeList.push(mydoc.college);
      });
    });
    
    reply = `These colleges offer ` + course + ` classes: \n`;
    collegeList.forEach(function (c){
      reply.concat(c + `\n`);
    });
  }
  else{
    await Course.findOne({subject: course, college: college}, function (err, c){
    if (c != null){
      var str = `Yes, ` + college + ` offers ` + course + ` classes`;
      reply = { 'speech' : str};
    }else{
      var str = `No, ` + college + ` does not offer ` + course + ` classes`;
      reply = {'speech' : str};
    }
  });
    
  }
   
    
    res.status(200).json(reply);
}