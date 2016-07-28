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
        // We check whether an autoRefresh loop is already running
        if (typeof(autoRefresh) === 'undefined') {
            this.props.populateAll();
            const autoRefresh = setInterval(this.props.populateAll, 2 * 60 * 1000);
        }
    }

    render() {
        return (
            <div id="pane-container" className="main dashboard">
                <div className="pane-components-wrapper">
                    <TopBar createWorkingCheck={this.props.createWorkingCheck} />
                    <GlobalStats globalStats={this.props.globalStats} />
                    <CheckStats openCheck={this.props.openCheck} />
                </div>
                <ChecksTable
                    checks={this.props.checks}
                    openCheckID={this.props.openCheck.id || null}
                    destroy={this.props.destroy}
                    setWorkingCheck={this.props.setWorkingCheck}
                    updateWorkingCheck={this.props.updateWorkingCheck}
                    saveWorkingCheck={this.props.saveWorkingCheck}
                    openCheckStats={this.props.openCheckStats}
                    closeCheckStats={this.props.closeCheckStats}
                />
            </div>
        );
    }
}

export default Dashboard;
