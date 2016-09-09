module.exports = (req, res, next) => {
    // if (req.user) {
    // if (req.session.authenticated) {

    if (req.isAuthenticated()) {
        return res.view('homepage', { isLoggedIn: true });
    }
    return res.view('homepage', { isLoggedIn: false});
};

