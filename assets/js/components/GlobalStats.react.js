define(['react', 'react-chartist', '../stores/ChecksStore'], function(React, ChartistGraph, ChecksStore) {

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
                        className: 'primary-bar'
                    },
                    {
                        value: 100 - percentageOfChecksUp,
                        classname: 'secondary-bar'
                    }
                ]
            };
            const availabilityDataset = {
				series: [
					{
						value: this.state.globalStats.availabilitiesAvg,
						className: 'primary-bar'
					},
					{
						value: 100 - this.state.globalStats.availabilitiesAvg,
						className: 'secondary-bar'
					}
				]
			};
			const lastErrorDataset = {
                series: [
                    {
                        value: 100,
                        className: 'primary-bar--nok'
                    }
                ]
            };

            return (
                <div className="global-stats">
                    <div className="global-data-block global-status">
                        <div className="donut">
                            <ChartistGraph className={'ct-pie'} data={checksUpDataset} options={donutOptions} type="Pie" />
                        </div>
                        <p className="donut-content">
                            <span>
                                {this.state.globalStats.checksUp}/{this.state.globalStats.numberOfChecks} servers
                            </span>
                            <span className="secondary-text">are responding</span>
                        </p>
                    </div>
                    <div className="global-data-block availability">
                        <div className="donut">
                            <ChartistGraph className={'ct-pie'} data={availabilityDataset} options={donutOptions} type="Pie" />
						</div>
                        <p className="donut-content">
                            <span>
                                {this.state.globalStats.availabilitiesAvg}
                            </span>
                        </p>
                    </div>
                    <div className="global-data-block last-error">
                        <div className="donut">
                            <ChartistGraph className={'ct-pie'} data={lastErrorDataset} options={donutOptions} type="Pie" />
						</div>
                        <p className="donut-content">
                            <span>
                                <span>{this.state.globalStats.lastError.checkName}</span>
                                <span>{this.state.globalStats.lastError.duration}</span>
                            </span>
                            <span className="aside-text">Last outage</span>
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
