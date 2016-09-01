import React, { PropTypes } from 'react';
import TopBar from './Components/TopBar.react';
import GlobalStats from './Components/GlobalStats.react';
import CheckStats from './Components/CheckStats.react';
import ChecksTable from './Components/ChecksTable.react';

import '../../styles/dashboard.scss';


class Dashboard extends React.Component {
    componentDidMount() {
        // We check whether an autoRefresh loop is already running
        if (typeof autoRefresh === 'undefined') {
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

Dashboard.propTypes = {
    checks: PropTypes.object.isRequired,
    globalStats: PropTypes.object.isRequired,
    openCheck: PropTypes.object.isRequired,
    populateAll: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    createWorkingCheck: PropTypes.func.isRequired,
    setWorkingCheck: PropTypes.func.isRequired,
    updateWorkingCheck: PropTypes.func.isRequired,
    saveWorkingCheck: PropTypes.func.isRequired,
    openCheckStats: PropTypes.func.isRequired,
    closeCheckStats: PropTypes.func.isRequired,
};

export default Dashboard;
