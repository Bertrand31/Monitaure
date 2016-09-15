import React, { PropTypes } from 'react';

import TopBar from './Components/TopBar';
import GlobalStats from './Components/GlobalStats';
import CheckStats from './Components/CheckStats';
import ChecksTable from './Components/ChecksTable';


class Dashboard extends React.Component {
    componentDidMount() {
        // We check whether an autoRefresh loop is already running
        if (typeof this.autoRefresh === 'undefined' || !this.autoRefresh) {
            this.props.populateAll();
            this.autoRefresh = setInterval(this.props.populateAll, 2 * 60 * 1000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.autoRefresh);
        this.autoRefresh = false;
    }

    render() {
        return (
            <div
                className={`o-main o-pane-container dashboard ${this.props.menuIsOpen ? 's-is-covered' : ''}`}
                onClick={() => this.props.closeMenu()}
            >
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
    menuIsOpen: PropTypes.bool.isRequired,
    openCheck: PropTypes.object.isRequired,
    populateAll: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    createWorkingCheck: PropTypes.func.isRequired,
    setWorkingCheck: PropTypes.func.isRequired,
    updateWorkingCheck: PropTypes.func.isRequired,
    saveWorkingCheck: PropTypes.func.isRequired,
    openCheckStats: PropTypes.func.isRequired,
    closeCheckStats: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default Dashboard;
