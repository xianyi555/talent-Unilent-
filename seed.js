var db = require("./models");

var usersList = [{
  name: 'John',
  email: 'johntest@gmail.com',
  location: 'San Francisco',
  talents: [ 'soft-engineer', 'writing' ]
}, {
  name: 'Lily',
  email: 'lilytest@gmail.com',
  location: 'New York',
  talents: [ 'ice-skating' ]
}, {
  name: 'Jack',
  email: 'jacktest@gmail.com',
  location: 'Chicago',
  talents: [ 'teaching', 'singing', 'dacing', 'swimming' ]
}, {
  name: 'Ann',
  email: 'anntest@gmail.com',
  location: 'Boston',
  talents: [ 'piano', 'painting' ]
}];


db.User.remove({}, function(err, users){
  // code in here runs after all users are removed
  db.User.create(usersList, function(err, users){
    // code in here runs after all users are created
    if (err) { return console.log('ERROR', err); }
    console.log("all users:", users);
    console.log("created", users.length, "users");
    process.exit();
  }); 
});
