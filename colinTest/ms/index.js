
var course = require('./course');




module.exports = function(req, res) {
  let action = req.body.result.action;
  
 
  // console.log(req.body);
  var actionCommand = action.split('.');
  
  if (actionCommand[1] == "program" && actionCommand[2] == "exist"){
    course(req, res);
   
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