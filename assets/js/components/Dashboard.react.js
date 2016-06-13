define(
    ['react', 'react-dom',
    './TopButton.react',
    './GlobalStats.react',
    './CheckStats.react',
    './ChecksTable.react',
    '../actions/ChecksActions',
    '../stores/ChecksStore'],
    function(React, ReactDOM, TopButton, GlobalStats, CheckStats, ChecksTable, ChecksActions, ChecksStore) {

        function getChecksState() {
            return {
                allChecks: ChecksStore.getAllChecks(),
                globalStats: ChecksStore.getGlobalStats()
            };
        }
        const Dashboard = React.createClass({
            getInitialState() {
                console.log(getChecksState());
                return getChecksState();
            },
            componentWillMount() {
                ChecksActions.populateAll();
                setInterval(ChecksActions.populateAll, 60*1000);
            },
            componentDidMount() {
                ChecksStore.addChangeListener(this._onChange);
            },
            componentWillUnmount() {
                ChecksStore.removeChangeListener(this._onChange);
            },

            render() {

                return (
                    <div className="dashboard">
                        <TopButton />
                        <GlobalStats />
                        <CheckStats allChecks={this.state.allChecks} />
                        <ChecksTable />
                    </div>
                );
            },

            _onChange() {
                this.setState(getChecksState());
            }
        });

        return Dashboard;
    }
);
