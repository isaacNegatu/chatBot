
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




const searchDBforCourse = new Promise((res, rej) => {
   // console.log("here", course);
   var reply = "";
   Course.find({subject: course}, function(err, course)
      {
       if (err)
       {
         console.log(err);
         rej(err);
       }else{
         reply = "yes it exits";
         console.log(course[0]);
       }
  
    });
  
  res(reply);
   
  
});



module.exports = function(req, res) {
  let action = req.body.result.action;
  
 
  // console.log(req.body);
  var actionCommand = action.split('.');
  
  if (actionCommand[1] == "program" && actionCommand[2] == "exist"){
    var course = req.body.result.parameters.courses;
  
    var reply = "";
    console.log(req.body.result.parameters);
   
    console.log(reply, "then");
   
  }
}





// (async function example() {
//  let driver = await new Builder().forBrowser('firefox').build();
//  try {
//    await driver.get('https://eservices.minnstate.edu/registration/search/advanced.html?campusid=mnonline');
//    //await driver.findElement(By.id('searchrcid')).sendKeys('webdriver', Key.RETURN);
//    driver.getTitle().then(function(title) {
//      console.log(title);

//      if(title === 'Select a Campus') {
//        console.log('Test passed');
//      } else {
//        console.log('Test failed');
//      }
//    });

//    await driver.findElement(By.name('searchrcid')).findElement(By.tagName('option')).then(function (searchId){
//      console.log("its woooooooooooooooooooooooooooooooooorking")
//      console.log(searchId[1]);
//    }).catch(err => {
//      console.log(err);
//    });

//  } finally {
//    await driver.quit();
//  }
// })().catch(err => {
//   console.log(err);
// });