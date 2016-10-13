module.exports = (req, res, next) => {
    if (!req.wantsJSON || req.isAuthenticated()) {
        return next();
    }

    return res.forbidden();
};

