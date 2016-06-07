define(['react'], function(React) {
    const GlobalStats = React.createClass({
        render() {
            return (
                <span>
                    {this.props.data.numberOfChecks}/{this.props.data.checksUp} servers
                </span>
                // <span class="secondary-text">are responding</span>
                <span>
                    {this.props.data.availabilitiesAvg}
                </span>
            );
        }
    });
    return GlobalStats;
});
