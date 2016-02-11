/**
 * ServersController
 *
 * @description :: Server-side logic for managing Servers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /*
    * ServersController.list()
    */
    list: function (req, res) {
        Servers.find().exec(function listServers(err, records) {
            if (err) throw err;
            return res.json(records);
        });
    },

    /*
    * ServersController.create()
    */
    create: function (req, res) {
        Servers.create({
            name: req.query.name,
            domainNameOrIP: req.query.domainNameOrIP,
            port: req.query.port
        }).exec(function createServer(err, created) {
            if (err) throw err;
            return res.json(created);
        });
    },

    /*
    * ServersController.update()
    */
    update: function (req, res) {
        Servers.update({name: req.query.name}, {
            name: req.query.name,
            domainNameOrIP: req.query.domainNameOrIP,
            port: req.query.port
        }).exec(function updateServer(err, updated) {
            if (err) throw err;
            return res.json(updated);
        });
    },

    /*
    * CommentController.destroy()
    */
    destroy: function (req, res) {
        Servers.destroy({
            name: req.query.name
        }).exec(function destoryServer(err) {
            if (err) throw err;
            return res.json('ok');
        });
    }
};

