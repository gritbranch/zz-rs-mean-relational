var passport = require('passport'),
	db = require('./sequelize');

module.exports = function () {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		db.User.find({where: {id: id}}).then(function(user){
			if(!user){
				return done(null, false);
			}
			done(null, user);
		}).catch(function(err){
			done(err, null);
		});
	});


	require('./strategies/local.js')();
//	require('./strategies/facebook.js')();
//	require('./strategies/twitter.js')();
//	require('./strategies/google.js')();
};