var db = require("./models");

var usersList = [{
  name: 'TTTTTTTT',
  description: 'johntest@gmail.com',
}];


db.Talent.remove({}, function(err, users){
  // code in here runs after all users are removed
  db.Talent.create(usersList, function(err, users){
    // code in here runs after all users are created
    if (err) { return console.log('ERROR', err); }
    console.log("all users:", users);
    console.log("created", users.length, "users");
    process.exit();
  }); 
});
