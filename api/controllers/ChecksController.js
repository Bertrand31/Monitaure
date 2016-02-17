module.exports = {

    show: function (req, res) {
        ChecksManagement.listChecks(req.query.id, function(records) {
            //return res.json(records);
            return res.view({checks: records});
        });
    },

    create: function (req, res) {
        var data = {
            name: req.query.name,
            domainNameOrIP: req.query.domainNameOrIP,
            port: req.query.port
        };
        ChecksManagement.createCheck(data, function(created) {
            return res.json(created);
        });
    },

    update: function (req, res) {
        var data = {
            name: req.query.name,
            domainNameOrIP: req.query.domainNameOrIP,
            port: req.query.port
        }
        ChecksManagement.updateCheck({name: req.query.name}, data, function(updated) {
            return res.json(updated);
        });
    },

    destroy: function (req, res) {
        ChecksManagement.destroyCheck(req.query.id, function(destroyed) {
            return res.json(destroyed);
        });
    }
};

