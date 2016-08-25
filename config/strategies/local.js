var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	db = require('../sequelize');

module.exports = function () {
	passport.use(new LocalStrategy({
    	usernameField: 'username',
   		passwordField: 'password'
  	},
	function(username, password, done) {
		db.User.find({ where: { username: username }}).then(function(user) {
		if (!user) {
			done(null, false, { message: 'Unknown user' });
		} else if (!user.authenticate(password)) {
			done(null, false, { message: 'Invalid password'});
		} else {
			done(null, user);
		}
		}).catch(function(err){
		done(err);
		});
	}
	));
};