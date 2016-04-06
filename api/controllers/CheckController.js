module.exports = {

    show: function (req, res) {
        CheckManagement.getUserAndChecksData(req.user.id, function(err, data) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.view({ data });
            }
        });
    },

    getallstats: function (req, res) {
        CheckManagement.getUserAndChecksData(req.user.id, function(err, data) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.json(data);
            }
        });
    },

    getcheckstats: function (req, res) {
        CheckManagement.getData(req.param('id'), function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
                return res.json(data);
            }
        });
    },

    create: function (req, res) {
        // TODO: Move logic to services?
        CheckManagement.getChecksNumber(req.user.id, function (err, numberOfChecks) {
            if (err) {
                return res.serverError(err.responseText);
            } else {
                if (numberOfChecks >= sails.config.checksNbLimit) {
                    return res.serverError('You reached the limit of ten checks per user');
                } else {
                    var data = {
                        name: req.query.name,
                        domainNameOrIP: req.query.domainNameOrIP,
                        port: req.query.port,
                        owner: req.user.id
                    };
                    // TODO: Improve & throw appropriate error message
                    if (data.name.length === 0 || data.domainNameOrIP.length === 0 || data.port === 0) {
                        return res.serverError('Invalid attributes');
                    } else {
                        CheckManagement.createCheck(data, function(err, created) {
                            if (err) {
                                return res.serverError(err);
                            } else {
                                return res.json(created);
                            }
                        });
                    }
                }
            }
        });
    },

//    update: function (req, res) {
//        var data = {
//            name: req.query.name,
//            domainNameOrIP: req.query.domainNameOrIP,
//            port: req.query.port
//        };
//        CheckManagement.updateCheck(req.param('id'), data, function(updated) {
//            return res.json(updated);
//        });
//    },

    destroy: function (req, res) {
        // TODO: Only allow user's checks deletion
        CheckManagement.destroyCheck(req.param('id'), function(destroyed) {
            return res.json(destroyed);
        });
    }
};

