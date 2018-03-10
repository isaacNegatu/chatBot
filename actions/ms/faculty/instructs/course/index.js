let mongoose = require('mongoose');
var Course = require("../../../../../model/course");
var Faculty = require("../../../../../model/facultyStaffTest");


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


module.
