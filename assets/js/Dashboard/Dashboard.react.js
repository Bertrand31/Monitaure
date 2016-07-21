import React from 'react';
import TopBar from './Components/TopBar.react';
import GlobalStats from './Components/GlobalStats.react';
import CheckStats from './Components/CheckStats.react';
import ChecksTable from './Components/ChecksTable.react';
import ChecksActions from './Actions';

class Dashboard extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        ChecksActions.populateAll();
        // TODO: Check if not already running?
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

export default Dashboard;
