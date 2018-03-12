var mongoose = require("mongoose");

var db = process.env.MONGODB_URI;

mongoose.connect(db);

module.exports = mongoose.connection.on('open', function (){
  console.log("connected to mongo successfully");
  return db;
}).then(function (){
  mongoose.connection.db.listCollections().toArray(function(err, names){
    if (err) console.log(err);

    names.forEach(function (col){
      console.log(col.name);
    });
  });

});