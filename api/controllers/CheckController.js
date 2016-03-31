var async = require('async');

module.exports = {

    show: function (req, res) {

        async.parallel([
            function(callback) {
                CheckManagement.listUserChecks(req.user.id, function(err, user) {
                    var emailHash = require('crypto').createHash('md5').update(user.email).digest('hex');
                    callback(err, {
                        checks: user.checks,
                        userName: user.username,
                        userEmailMD5: emailHash
                    });
                });
            },
            function(callback) {
                CheckManagement.getGlobalData(req.user.id, function(err, globalStats) {
                    callback(err, globalStats);
                });
            }
        ], function(err, data) {
            return res.view({
                userChecks: data[0],
                globalData: data[1]
            });
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

