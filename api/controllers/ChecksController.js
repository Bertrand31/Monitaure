/**
 * ChecksController
 *
 * @description :: Server-side logic for managing Checks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /*
    * ChecksController.list()
    */
    list: function (req, res) {
        Checks.find().exec(function listChecks(err, records) {
            if (err) throw err;

            //TMP
            Networking.checkPort('commeunarbre.fr', 81, function(results) {
                console.log(results);
            });

            return res.json(records);
        });
    },

    /*
    * ChecksController.create()
    */
    create: function (req, res) {
		console.log(req.query);
        Checks.create({
            name: req.query.name,
            domainNameOrIP: req.query.domainNameOrIP,
            port: req.query.port
        }).exec(function createServer(err, created) {
            if (err) throw err;
            return res.json(created);
        });
    },

    /*
    * ChecksController.update()
    */
    update: function (req, res) {
        Checks.update({name: req.query.name}, {
            name: req.query.name,
            domainNameOrIP: req.query.domainNameOrIP,
            port: req.query.port
        }).exec(function updateServer(err, updated) {
            if (err) throw err;
            return res.json(updated);
        });
    },

    /*
    * ChecksController.destroy()
    */
    destroy: function (req, res) {
        Checks.destroy({
            name: req.query.name
        }).exec(function destoryServer(err) {
            if (err) throw err;
            return res.json('ok');
        });
    }
};

