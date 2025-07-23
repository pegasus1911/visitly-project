function requireLogin(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.send('You are not logged in, please log in first');
  }
  next();
}

module.exports = requireLogin;
