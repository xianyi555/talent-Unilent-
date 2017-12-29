var mongoose = require("mongoose");


var talentSchema = mongoose.Schema({
    user_id        : String,
    name           : String,
    email          : String,
    description    : String,
});

module.exports = mongoose.model('Talent', talentSchema);