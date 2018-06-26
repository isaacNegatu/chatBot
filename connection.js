/**
  This 'connection.js' file connects to the mongo data base 
  which is hosted at mlab.com

*/


var mongoose = require("mongoose");

//uri of the database
var db = process.env.MONGODB_URI;

//connect to the database using mongoose library
mongoose.connect(db);

//we export the function so that we can 'include' it in other files and get a connection
module.exports = mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
  return db;
}).then(function (){
  
  //this block is just to make sure that we are connected
  mongoose.connection.db.listCollections().toArray(function(err, names){
    if (err) console.log(err);
    
    console.log(names);
  });

});