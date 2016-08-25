'use strict';

/**
* Module dependencies.
*/
var passport = require('passport');

module.exports = function(app) {

// User Routes
var users = require('../../app/controllers/users.server.controller');

app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);

app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true
	}));

app.route('/signout')
    .get(users.signout);

app.route('/me')
    .get(users.me);    

/*
// User Routes
app.get('/signout', users.signout);
app.get('/users/me', users.me);

// Setting up the users api
app.post('/users', users.signup);

// Setting the local strategy route
app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
}), users.session);
*/

// Finish with setting up the userId param
app.param('userId', users.user);
};