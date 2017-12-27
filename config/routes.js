var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
var usersController   = require('../controllers/usersController');
var staticsController = require('../controllers/staticsController');
var talent            = require('../controllers/talentsController');


function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we can continue with next
  // https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
  if (req.isAuthenticated()) return next();

  // Otherwise
  req.flash('errorMessage', 'Login to access!');
  return res.redirect('/login');
}

function unAuthenticatedUser(req, res, next) {
  if (!req.isAuthenticated()) return next();

  // Otherwise
  req.flash('errorMessage', 'You are already logged in!');
  return res.redirect('/');
}


router.route('/')
  .get(staticsController.home);


router.route('/signup')
  .get(unAuthenticatedUser, usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(unAuthenticatedUser, usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

router.route("/secret")
  .get(authenticatedUser, usersController.getSecret)

router.route("/talent")
  .get(authenticatedUser, talent.talent)

router.route("/api/talent")
  .get(authenticatedUser, talent.index)
  .post(authenticatedUser, talent.create)

router.route("/api/talent/:id")
  .get(authenticatedUser, talent.show)
  .put(authenticatedUser, talent.update)
  .delete(authenticatedUser, talent.destroy)

module.exports = router
