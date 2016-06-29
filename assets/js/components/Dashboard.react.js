import React from 'react';
import TopBar from './Dashboard/TopBar.react';
import GlobalStats from './Dashboard/GlobalStats.react';
import CheckStats from './Dashboard/CheckStats.react';
import ChecksTable from './Dashboard/ChecksTable.react';
import ChecksActions from '../actions/ChecksActions';

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

export default Dashboard;
