/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

    sails.on('lifted', function() {
        var worker  = require(__dirname + '/../worker.js');
        setInterval(function() {
            worker(function(data) {
                console.log(data);
                sails.sockets.blast('checksData', data);
            });
        },5000);
    });

    cb();

};
