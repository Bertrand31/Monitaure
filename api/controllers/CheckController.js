module.exports = {

    getcheckstats(req, res) {
        CheckManagement.getData(DB.fetchOne, req.user.id, req.param('id'), (err, data) => {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },

    getuserandglobalstats(req, res) {
        CheckManagement.getUserAndGlobalStats(DB.fetchAndPopulate, req.user.id, (err, data) => {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },

    create(req, res) {
        const data = {
            name: String(req.param('name')),
            domainNameOrIP: String(req.param('domainNameOrIP')),
            port: Number(req.param('port')),
            emailNotifications: Boolean(req.param('emailNotifications')),
            owner: req.user.id,
        };
        CheckManagement.createCheck(DB.fetchAndPopulate, DB.create, req.user.id, data, (err, created) => {
            if (err) return res.serverError(err);

            return res.json(created);
        });
    },

    update(req, res) {
        const data = {
            name: String(req.param('name')),
            emailNotifications: Boolean(req.param('emailNotifications')),
        };
        CheckManagement.updateCheck(DB.fetchOne, DB.update, req.user.id, req.param('id'), data, (err, updated) => {
            if (err) return res.serverError(err);

            return res.json(updated[0]);
        });
    },

    destroy(req, res) {
        CheckManagement.destroyCheck(DB.fetchOne, DB.destroy, req.user.id, req.param('id'), (err, destroyed) => {
            if (err) return res.serverError(err);

            return res.json(destroyed[0]);
        });
    },
};

