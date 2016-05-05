module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    else {
        return res.redirect('/login');
    }
};

