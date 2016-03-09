module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        console.log('FAIL');
        return res.redirect('/login');
    }
};

