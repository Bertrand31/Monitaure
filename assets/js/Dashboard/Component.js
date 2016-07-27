import React from 'react';
import TopBar from './Components/TopBar.react';
import GlobalStats from './Components/GlobalStats.react';
import CheckStats from './Components/CheckStats.react';
import ChecksTable from './Components/ChecksTable.react';
import ChecksActions from './Actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.populateAll();
        // TODO: Check if not already running?
        setInterval(this.props.populateAll, 2 * 60 * 1000);
    }

    render() {
        return (
            <div>
                <div className="pane-components-wrapper">
                    <TopBar />
                    <GlobalStats globalStats={this.props.globalStats} />
                    {/* <CheckStats /> */}
                </div>
                <ChecksTable checks={this.props.checks} />
            </div>
        );
    }
}

export default Dashboard;
