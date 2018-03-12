
var Course = require("../../../../model/course");

let connection = require("../../../../connection");


module.exports = async function(req, res) {
  let action = req.body.result.action;
  let reply = {};
  
  var course = req.body.result.parameters.courses.toUpperCase();
  var college = req.body.result.parameters.College;
  
  var flag = false;
  var collegeList = [];
  
  if(college == ""){
    var str = "";
    
    await Course.find({subject: course}, function (err, li){
      
      
      li.forEach(function (mydoc){
        
        var cl = collegeList.find(function (c){
          return mydoc.college == c;
        });
        
        if(cl == undefined){
          collegeList.push(mydoc.college);
        }
      });
    }).then(function (){
      str = "These colleges offer " + course + " classes: \n";
    
      collegeList.forEach(function (c){
        console.log(c);
        str += c + "\n";
      });
      
     
      
    }).then(function (){
      console.log(str);
      reply = {"speech" : str};
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