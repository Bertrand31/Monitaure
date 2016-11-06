module.exports = (req, res, next) => {
    if (req.wantsJSON) {
        return next();
    }

    return res.forbidden();
};

