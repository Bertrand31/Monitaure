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
            openCheck: ChecksStore.getSingle(ChecksStore.getOpenCheckID())
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
            if (!this.state.openCheck) {
                return null;
            }

			const chartDataset = historyToChartData(this.state.openCheck.history);

            return (
                <ChartistGraph className={'ct-chart'} data={chartDataset} options={chartOptions} type="Line" />
            );
        },
        _onChange() {
            const openCheckID = getOpenCheckState();
            this.setState(getOpenCheckState(openCheckID));
        }
    });

    return CheckStats;
});
