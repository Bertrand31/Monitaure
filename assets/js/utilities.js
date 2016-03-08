/**************
 * UTILITIES *
***************/

var historyToChartData = function(history, callback) {
    var chartData = {
        labels: [],
        series: [
            []
        ]
    };
    for (i=0; i<history.length; i++) {
        var fancyDate = moment(history[i].date).fromNow();
        var lightDate = moment(history[i].date).format('H:mm');
        chartData.labels.push(lightDate);
        chartData.series[0].push({
            meta: fancyDate,
            value: history[i].time
        });
    }
    callback(chartData);
};
