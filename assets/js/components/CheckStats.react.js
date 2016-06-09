define(['react', 'react-chartist', 'chartist-plugin-tooltip', 'moment', '../stores/ChecksStore'], function(React, ChartistGraph, chartistTooltip, moment, ChecksStore) {

	const chartOptions = {
        fullWidth: false,
        showArea: true,
        low: 0,
        height: 250,
        onlyInteger: true,
        axisY: {
            // showLabel: false,
            offset: 50,
            showGrid: false,
            scaleMinSpace: 100,
            labelInterpolationFnc: function(value) {
                return value + 'ms';
            }
        },
        plugins: [
            chartistTooltip()
        ]
	};
    function historyToChartData(history) {
		const chartData = {
            labels: [],
            series: [
                []
            ]
        };
        for (let i=0; i<history.length; i++) {
            const fancyDate = moment(history[i].date).fromNow();
            const lightDate = moment(history[i].date).format('H:mm');
            chartData.labels.push(lightDate);
            chartData.series[0].push({
                meta: fancyDate,
                value: history[i].duration
            });
        }
		return chartData;
    }

    function getOpenCheckState() {
        return {
            openCheck: ChecksStore.getOpenCheck()
        };
    }

    const CheckStats = React.createClass({
        getInitialState() {
            return getOpenCheckState();
        },
        componentDidMount() {
            ChecksStore.addChangeListener(this._onChange);
        },
        componentWillUnmount() {
            ChecksStore.removeChangeListener(this._onChange);
        },
        render() {
            if (Object.keys(this.state.openCheck).length < 1) {
                return null;
            }

            const openCheck = this.state.openCheck;
			const chartDataset = historyToChartData(openCheck.history);
            const lastOutagePretty = moment(openCheck.lastOutage).format('D/MM/YY H:mm');
            const lastPing = openCheck.history[openCheck.history.length - 1],
                  lastPingDuration = lastPing.duration,
                  lastPingDate = moment(lastPing.date).format('HH:mm:ss');

            return (
                <div className="check-stats">
                    <div className="data">
                        <p className="name">{openCheck.name}</p>
                        <p>Avg latency: {openCheck.avg} ms</p>
                        <p>Min latency: {openCheck.min} ms</p>
                        <p>Max latency: {openCheck.max} ms</p>
                        <p data-perfect={openCheck.availability === 100}>Availability: {openCheck.availability}%</p>
                        <p>Last outage: {lastOutagePretty}</p>
                    </div>
                    <div className="top-data">
                        <p className="latency-wrapper">
                            <span className="latency-title">Latency</span>
                            <br />
                            <span className="latency"><span className="latency-value">{lastPingDuration} ms</span></span>
                        </p>
                        <p className="last-ping-date">{lastPingDate}</p>
					</div>
                    <ChartistGraph className={'ct-chart'} data={chartDataset} options={chartOptions} type="Line" />
                </div>
            );
        },
        _onChange() {
            const openCheckID = getOpenCheckState();
            this.setState(getOpenCheckState(openCheckID));
        }
    });

    return CheckStats;
});
