define(['react', 'react-chartist', 'moment', '../../stores/ChecksStore'], function(React, ChartistGraph, moment, ChecksStore) {

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
            labelInterpolationFnc(value) {
                return `${value} ms`;
            }
        }
	};
    function historyToChartData(history) {
		const chartData = {
            labels: [],
            series: [
                []
            ]
        };
        for (let i = 0; i < history.length; i++) {
            const lightDate = moment(history[i].date).format('H:mm');
            chartData.labels.push(lightDate);
            chartData.series[0].push({
                value: history[i].duration
            });
        }
		return chartData;
    }

    class CheckStatsView extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            const openCheck = this.props.openCheck;
			const chartDataset = historyToChartData(openCheck.history);
            const lastOutagePretty = openCheck.lastOutage ? moment(openCheck.lastOutage).format('D/MM/YY H:mm') : '-';
            const lastPing = openCheck.history[openCheck.history.length - 1];
            const lastPingDuration = lastPing.duration ? `${lastPing.duration} ms` : `-`;
            const lastPingDate = moment(lastPing.date).format('HH:mm:ss');

            return (
                <section className="c-check-stats">
                    <div className="c-check-stats__data">
                        <p className="c-check-stats__name">{openCheck.name}</p>
                        <p>Avg latency: {openCheck.avg} ms</p>
                        <p>Min latency: {openCheck.min} ms</p>
                        <p>Max latency: {openCheck.max} ms</p>
                        <p>Availability: <span data-perfect={openCheck.availability === 100}>{openCheck.availability}%</span></p>
                        <p>Last outage:<br />{lastOutagePretty}</p>
                    </div>
                    <div className="c-check-stats__main-chart">
                        <div className="top-data">
                            <p className="latency-wrapper">
                                <span className="latency-title">Latency</span>
                                <br />
                                <span className="latency"><span className="latency-value">{lastPingDuration}</span></span>
                            </p>
                            <p className="last-ping-date">{lastPingDate}</p>
                        </div>
                        <ChartistGraph className={'ct-chart'} data={chartDataset} options={chartOptions} type="Line" />
                    </div>
                </section>
            );
        }
    }

    function getOpenCheckState() {
        return {
            openCheck: ChecksStore.getOpenCheck()
        };
    }

    class CheckStatsController extends React.Component {
        constructor() {
            super();
            this.state = getOpenCheckState();
        }
        componentDidMount() {
            ChecksStore.addChangeListener(this._onChange.bind(this));
        }
        componentWillUnmount() {
            ChecksStore.removeChangeListener(this._onChange.bind(this));
        }

        render() {
            if (Object.keys(this.state.openCheck).length < 1) {
                return null;
            }

            return (<CheckStatsView openCheck={this.state.openCheck} />);
        }

        _onChange() {
            this.setState(getOpenCheckState());
        }
    }

    return CheckStatsController;
});
