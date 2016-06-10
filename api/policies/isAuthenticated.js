module.exports = function(req, res, next) {
    // if (req.session.authenticated) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        if (req.wantsJSON) {
            return res.forbidden();
        }
        return res.redirect('/login');
    }
};

