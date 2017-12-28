var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Unilent');

var User = require('./user');
var Talent = require('./talent');


//exported modules
module.exports = {
  User: User,
  Talent: Talent
};