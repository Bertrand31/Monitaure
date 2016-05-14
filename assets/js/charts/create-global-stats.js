define(['jquery', 'chartist'], function($, Chartist) {
    return function(globalStats) {

        // Global stats
        const donutOptions = {
            width: '200px',
            height: '200px',
            donut: true,
            donutWidth: 5,
            startAngle: 230,
            total: 140,
            showLabel: false
        };

        const percentageOfChecksUp = (globalStats.checksUp * 100) / globalStats.numberOfChecks;
        new Chartist.Pie('.checks-up-donut',
            {
                series: [
                    {
                        value: percentageOfChecksUp,
                        className: 'primary-bar'
                    },
                    {
                        value: 100 - percentageOfChecksUp,
                        classname: 'secondary-bar'
                    }
                ]
            },
            donutOptions
        );
        new Chartist.Pie('.availability-donut', {
            series: [
                {
                    value: globalStats.availabilitiesAvg,
                    className: 'primary-bar'
                },
                {
                    value: 100 - globalStats.availabilitiesAvg,
                    className: 'secondary-bar'
                }
            ]},
            donutOptions
        );
        const lastErrorHour = globalStats.lastError.duration ? moment(globalStats.lastError.duration).format('HH:SS') : '-';
        const lastErrorDay = globalStats.lastError.duration ? moment(globalStats.lastError.duration).format('DD/MM') : '-';
        $('.last-error--hour').text(lastErrorHour);
        $('.last-error--day').text(lastErrorDay);
        new Chartist.Pie('.last-error-donut', {
                series: [
                    {
                        value: 100,
                        className: 'primary-bar--nok'
                    }
                ]
            },
            donutOptions
        );
    };
});
