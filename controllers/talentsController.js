var db = require('../models');

function talent(req, res) {
  res.render('talent.ejs', { message: req.flash('errorMessage') });
}

// GET /api/talents
function index(req, res) {
  db.Talent.find(function(err, talents) {
    res.json(talents);
  });
}

// POST /api/talents
function create(req, res) {

  var newTalent = new db.Talent({
    user_id: currentUser.id,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description
  })

  newTalent.save( function(err, talent) {
    if (err) { console.log('error', err); }
    res.json(talent);}
    )

}

// GET /api/talents/:talentId
function show(req, res) {
  db.Talent.findById(req.params.id, function(err, foundTalent) {
    res.json(foundTalent);
  });
}

// DELETE /api/talents/:talentId
function destroy(req, res) {
  db.Talent.findByIdAndRemove(req.params.id, function(err, deletedTalent) {
    console.log("asd")
    if (err) { console.log('error', err); }
    res.json(deletedTalent);

  });
}

// PUT or PATCH /api/talents/:talentId
function update(req, res) {
  db.Talent.findById(req.params.id, function(err, foundTalent) {
    console.log(req.body)
    if (err) { console.log('talentsController.update error', err); }
    foundTalent.name = req.body.name;
    foundTalent.email = req.body.email;
    foundTalent.description = req.body.description;
    foundTalent.save(function(err, savedTalent) {
    if (err) { console.log('saving altered talent failed'); }
    res.json(savedTalent);
    });
  });
}

module.exports = {
  talent: talent,
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
