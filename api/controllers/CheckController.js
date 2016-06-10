module.exports = {

    getcheckstats: function (req, res) {
        CheckManagement.getData(DB.fetchOne, req.user.id, req.param('id'), function(err, data) {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },

    getuserandglobalstats: function (req, res) {
        CheckManagement.getUserAndGlobalStats(DB.fetchAndPopulate, req.user.id, function(err, data) {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },

    create: function (req, res) {
        const data = {
            name: String(req.param('name')),
            domainNameOrIP: String(req.param('domainNameOrIP')),
            port: Number(req.param('port')),
            emailNotifications: Boolean(req.param('emailNotifications')),
            owner: req.user.id
        };
        CheckManagement.createCheck(DB.fetchAndPopulate, DB.create, req.user.id, data, function (err, created) {
            if (err) return res.serverError(err);

            return res.json(created);
        });
    },

    update: function (req, res) {
        const data = {
            name: String(req.param('name')),
            emailNotifications: Boolean(req.param('emailNotifications'))
        };
        CheckManagement.updateCheck(DB.fetchOne, DB.update, req.user.id, req.param('id'), data, function(err, updated) {
            if (err) return res.serverError(err);

            return res.json(updated[0]);
        });
    },

    destroy: function (req, res) {
        CheckManagement.destroyCheck(DB.fetchOne, DB.destroy, req.user.id, req.body.checkId, function(err, destroyed) {
            if (err) return res.serverError(err);

            return res.json(destroyed[0]);
        });
    }
};

