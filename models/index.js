var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/talent_network');

var User = require('./user');
var Talent = require('./talent');


//exported modules
module.exports = {
  User: User,
  Talent: Talent
};