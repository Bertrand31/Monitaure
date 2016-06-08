define(['react'], function(React) {
    const GlobalStats = React.createClass({
        render() {
            return (
                <div className="global-stats">
                    <div className="global-data-block global-status">
                        <div className="donut"></div>
                        <p className="donut-content">
                            <span>
                                {this.props.data.numberOfChecks}/{this.props.data.checksUp} servers
                            </span>
                            // <span class="secondary-text">are responding</span>
                        </p>
                    </div>
                    <div className="global-data-block availability">
                        <div className="donut"></div>
                        <p className="donut-content">
                            <span>
                                {this.props.data.availabilitiesAvg}
                            </span>
                        </p>
                    </div>
                    <div className="global-data-block last-error">
                        <div className="donut"></div>
                        <p className="donut-content">
                            <span>
                                <span>{this.props.data.lastError.checkName}</span>
                                <span>{this.props.data.lastError.duration}</span>
                            </span>
                            <span className="aside-text">Last outage</span>
                        </p>
                    </div>
                </div>
            );
        }
    };

    return GlobalStats;
});
