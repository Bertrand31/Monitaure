define(['jquery'], function($) {
    return function(data) {
        const processData = function(data) {
            updateGlobalStats(data.globalStats);
            updateTableRows(data.userData.checks);
        };
    };
});
