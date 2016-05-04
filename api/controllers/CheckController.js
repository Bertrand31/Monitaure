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

    showsimple: function (req, res) {
        CheckManagement.getCheckMinimalData(req.user.id, req.param('id'), function(err, data) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.json(data);
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
        CheckManagement.getData(req.user.id, req.param('id'), function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
                return res.json(data);
            }
        });
    },

    create: function (req, res) {
        let data = {
            name: String(req.param('name')),
            domainNameOrIP: String(req.param('domainNameOrIP')),
            port: Number(req.param('port')),
            emailNotifications: Boolean(req.param('emailNotifications')),
            owner: req.user.id
        };
        CheckManagement.createCheck(req.user.id, data, function (err, created) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.json(created);
            }
        });
    },

    update: function (req, res) {
        let data = {
            name: String(req.param('name')),
            emailNotifications: req.param('emailNotifications') ? true : false
        };
        CheckManagement.updateCheck(req.user.id, req.param('checkId'), data, function(err, updated) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.json(updated[0]);
            }
        });
    },

    destroy: function (req, res) {
        CheckManagement.destroyCheck(req.user.id, req.query.checkId, function(err, destroyed) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.json(destroyed[0]);
            }
        });
    }
};

