define(
    ['react', 'react-dom',
    './Dashboard/TopBar.react',
    './Dashboard/GlobalStats.react',
    './Dashboard/CheckStats.react',
    './Dashboard/ChecksTable.react',
    '../actions/ChecksActions'],
    function(React, ReactDOM, TopBar, GlobalStats, CheckStats, ChecksTable, ChecksActions) {

        class Dashboard extends React.Component {
            constructor() {
                super();
            }
            componentDidMount() {
                ChecksActions.populateAll();
                // TODO: Check if not already running
                setInterval(ChecksActions.populateAll, 2 * 60 * 1000);
            }

            render() {
                return (
                    <div>
                        <div className="pane-components-wrapper">
                            <TopBar />
                            <GlobalStats />
                            <CheckStats />
                        </div>
                        <ChecksTable />
                    </div>
                );
            }
        }

        return Dashboard;
    }
);
