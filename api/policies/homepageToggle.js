module.exports = (req, res) => {
    // if (req.user) {
    // if (req.session.authenticated) {

    if (req.isAuthenticated()) {
        return res.view('homepage', { isLoggedIn: true });
    }
    return res.view('homepage', { isLoggedIn: false });
};

