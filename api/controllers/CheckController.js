module.exports = {

    show: function (req, res) {
        CheckManagement.listUserChecks(req.user.id, function(user) {
            if (req.wantsJSON) {
                return res.json(user.checks);
            } else {
                var emailHash = require('crypto').createHash('md5').update(user.email).digest('hex');
                return res.view({
                    checks: user.checks,
                    userUsername: user.username,
                    userEmailMD5: emailHash
                });
            }
        });
    },

    getstats: function (req, res) {
        CheckManagement.getData(req.param('id'), function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
                return res.json(data);
            }
        });
    },

    create: function (req, res) {
        var data = {
            name: req.query.name,
            domainNameOrIP: req.query.domainNameOrIP,
            port: req.query.port,
            owner: req.user.id
        };
        if (data.name.length !== 0 && data.domainNameOrIP.length !== 0 && data.port !== 0) {
            CheckManagement.createCheck(data, function(created) {
                return res.json(created);
            });
        } else {
            return res.serverError(500);
        }
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
        CheckManagement.destroyCheck(req.param('id'), function(destroyed) {
            return res.json(destroyed);
        });
    }
};

