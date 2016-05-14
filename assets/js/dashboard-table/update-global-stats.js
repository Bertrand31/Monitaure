define(['jquery'], function($) {
    return function(data) {
        const globalWrapper = $('.global-data');
        globalWrapper.find('.checks-up').text(data.checksUp);
        globalWrapper.find('.total-checks').text(data.numberOfChecks);
        globalWrapper.find('.availabilities-avg').text(data.availabilitiesAvg);
        globalWrapper.find('.last-error--check-name').text(data.lastError.checkName);
        globalWrapper.find('.last-error--time').text(data.lastError.duration);
    };
});
