/**************
 * UTILITIES *
***************/

const historyToChartData = function(history, callback) {
    const chartData = {
        labels: [],
        series: [
            []
        ]
    };
    for (var i=0; i<history.length; i++) {
        const fancyDate = moment(history[i].date).fromNow();
        const lightDate = moment(history[i].date).format('H:mm');
        chartData.labels.push(lightDate);
        chartData.series[0].push({
            meta: fancyDate,
            value: history[i].duration
        });
    }
    callback(chartData);
};
