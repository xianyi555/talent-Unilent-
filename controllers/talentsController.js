var db = require('../models');

function talent(req, res) {
  res.render('talent.ejs', { message: req.flash('errorMessage') });
}

// GET /api/talents
function index(req, res) {
  db.Talent.find({}, function(err, allTalents) {
    res.json(allTalents);
  });
}

// POST /api/talents
function create(req, res) {
  db.Talent.create(req.body, function(err, talent) {
    if (err) { console.log('error', err); }
    res.json(talent);
  });
}

// GET /api/talents/:talentId
function show(req, res) {
  db.Talent.findById(req.params.talent_id, function(err, foundTalent) {
    res.json(foundTalent);
  });
}

// DELETE /api/talents/:talentId
function destroy(req, res) {
  db.Talent.findByIdAndRemove(req.params.talent_id, function(err, deletedTalent) {
    if (err) { console.log('error', err); }
    res.json(deletedTalent);

  });
}

// PUT or PATCH /api/talents/:talentId
function update(req, res) {
  db.Talent.findById(req.params.id, function(err, foundTalent) {
    if (err) { console.log('talentsController.update error', err); }
    foundTalent.name = req.body.name;
    foundTalent.email = req.body.email;
    foundTalent.location = req.body.location;
    foundTalent.save(function(err, savedTalent) {
    if (err) { console.log('saving altered album failed'); }
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
