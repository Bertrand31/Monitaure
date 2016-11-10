const DB = require('../api/services/DB');
const Worker = require('../api/services/Worker');
const ReportsWorker = require('../api/services/ReportsWorker');

module.exports.bootstrap = (callback) => {
    sails.on('lifted', () => {
        Worker(DB.fetch);
        ReportsWorker(DB.fetch, DB.update);
    });

    callback();
};
