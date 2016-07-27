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
                    <TopBar createWorkingCheck={this.props.createWorkingCheck} />
                    <GlobalStats globalStats={this.props.globalStats} />
                    {/* <CheckStats /> */}
                </div>
                <ChecksTable
                    checks={this.props.checks}
                    destroy={this.props.destroy}
                    updateWorkingCheck={this.props.updateWorkingCheck}
                    saveWorkingCheck={this.props.saveWorkingCheck}
                />
            </div>
        );
    }
}

export default Dashboard;
