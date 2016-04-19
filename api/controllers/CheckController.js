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
        CheckManagement.getCheckMinimalData(req.user.id, req.param('checkId'), function(err, data) {
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
        CheckManagement.createCheck(req.user.id, req.query, function (err, created) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.json(created);
            }
        });
    },

    update: function (req, res) {
        var data = {
            name: req.query.name,
            emailNotifications: req.query.emailNotifications ? true : false
        };
        CheckManagement.updateCheck(req.user.id, req.query.checkId, data, function(err, updated) {
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

