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
        var spawn = require('child_process').spawn;
        var worker = spawn('node', ['./worker.js']);

        worker.stdout.on('data', function(data) {
            console.log('Notice : ' + data);
        });
        worker.stderr.on('data', function(data) {
            console.log('Error : ' + data);
        });
    });

    cb();

};
