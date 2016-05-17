define(['react'], function(React) {
    return {
        TotalChecks: React.createClass({
            render: function() {
                return (
                    <span>
                        {this.props.data.numberOfChecks}/{this.props.data.checksUp} servers
                    </span>
                    // <span class="secondary-text">are responding</span>
                );
            }
        }),
        AvailabilitiesAvg: React.createClass({
            render: function() {
                return (
                    <span>
                        {this.props.data.availabilitiesAvg}
                    </span>
                );
            }
        })
    };
});
