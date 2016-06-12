define(['react', 'react-chartist', 'moment', '../stores/ChecksStore'], function(React, ChartistGraph, moment, ChecksStore) {

	const donutOptions = {
		width: '200px',
		height: '200px',
		donut: true,
		donutWidth: 5,
		startAngle: 230,
		total: 140,
		showLabel: false
	};

    function getGlobalStatsState() {
        return {
            globalStats: ChecksStore.getGlobalStats()
        };
    }

    const GlobalStats = React.createClass({
        getInitialState: function() {
            return getGlobalStatsState();
        },
        componentDidMount: function() {
            ChecksStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function() {
            ChecksStore.removeChangeListener(this._onChange);
        },
        render() {
            if (Object.keys(this.state.globalStats).length < 1) {
                return null;
            }

			const percentageOfChecksUp = (this.state.globalStats.checksUp * 100) / this.state.globalStats.numberOfChecks;
			const checksUpDataset = {
                series: [
                    {
                        value: percentageOfChecksUp,
                        className: 'c-donut__primary-bar'
                    },
                    {
                        value: 100 - percentageOfChecksUp,
                        classname: 'c-donut__secondary-bar'
                    }
                ]
            };
            const availabilityDataset = {
				series: [
					{
						value: this.state.globalStats.availabilitiesAvg,
						className: 'c-donut__primary-bar'
					},
					{
						value: 100 - this.state.globalStats.availabilitiesAvg,
						className: 'c-donut__secondary-bar'
					}
				]
			};
			const lastErrorDataset = {
                series: [
                    {
                        value: 100,
                        className: 'c-donut__primary-bar--nok'
                    }
                ]
            };
            const lastErrorExists = !!this.state.globalStats.lastError.time;
            const lastErrorHour = lastErrorExists ? moment(this.state.globalStats.lastError.time).format('HH:SS') : '-';
            const lastErrorDay = lastErrorExists ? moment(this.state.globalStats.lastError.time).format('DD/MM') : '-';

            return (
                <div className="l-grid">
                    <div className="l-grid__block">
                        <div className="c-donut">
                            <ChartistGraph className={'ct-pie'} data={checksUpDataset} options={donutOptions} type="Pie" />
                        </div>
                        <p className="c-donut-content">
                            <span className="c-donut-content__main-text">
                                {this.state.globalStats.checksUp}/{this.state.globalStats.numberOfChecks} servers
                                <span className="c-donut-content__secondary-text">are responding</span>
                            </span>
                            <span className="c-donut-content__aside-text">Status</span>
                        </p>
                    </div>
                    <div className="l-grid__block availability">
                        <div className="c-donut">
                            <ChartistGraph className={'ct-pie'} data={availabilityDataset} options={donutOptions} type="Pie" />
						</div>
                        <p className="c-donut-content">
                            <span className="c-donut-content__main-text">
                                {this.state.globalStats.availabilitiesAvg}
                                <span className="c-donut-content__secondary-text">%</span>
                            </span>
                            <span className="c-donut-content__aside-text">average availability</span>
                        </p>
                    </div>
                    <div className="l-grid__block last-error">
                        <div className="c-donut">
                            <ChartistGraph className={'ct-pie'} data={lastErrorDataset} options={donutOptions} type="Pie" />
						</div>
                        <p className="c-donut-content">
                            <span className="c-donut-content__main-text">
                                <span className="c-donut-content__main-text--check-name">{this.state.globalStats.lastError.checkName}</span>
                                <span className="c-donut-content__secondary-text c-donut-content__secondary-text--hour">{lastErrorHour} </span>
                                <span className="c-donut-content__secondary-text c-donut-content__secondary-text--day"> {lastErrorDay}</span>
                            </span>
                            <span className="c-donut-content__aside-text">Last outage</span>
                        </p>
                    </div>
                </div>
            );
        },
        _onChange: function() {
            this.setState(getGlobalStatsState());
        }
    });

    return GlobalStats;
});
