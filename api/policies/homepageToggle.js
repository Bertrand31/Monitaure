module.exports = (req, res) => {
    if (req.user) {
        return res.view('dashboard');
    }

    return res.view('homepage');
};
