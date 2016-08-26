exports.render = function (req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  res.render('index', {
    title: 'MEAN',
    username: req.user ? req.user.username : '',
    user: JSON.stringify(req.user)
  });
};