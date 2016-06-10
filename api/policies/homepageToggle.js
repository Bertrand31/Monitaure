module.exports = function(req, res, next) {
    if (req.user) {
        return res.view('dashboard');
    }

    return res.view('homepage');
};
