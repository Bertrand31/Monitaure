import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CheckRow from './CheckRow';

class ChecksTable extends Component {
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
        if (Object.keys(this.props.checks).length < 1) {
            return null;
        }

        const checksArray = [];
        const functions = {
            destroy: this.props.destroy,
            setWorkingCheck: this.props.setWorkingCheck,
            unsetWorkingCheck: this.props.unsetWorkingCheck,
            updateWorkingCheck: this.props.updateWorkingCheck,
            saveWorkingCheck: this.props.saveWorkingCheck,
            openCheckStats: this.props.openCheckStats,
            closeCheckStats: this.props.closeCheckStats,
        };

        const checks = this.props.checks;
        Object.values(checks).forEach((check) => {
            const isOpenCheck = check.id === this.props.openCheckID;
            const isNewCheck = check.id === 'tmpID';
            const historyLength = check.history.length - 1;

            let lastPingDuration = '-';
            let lastPingSpeed = '';
            let checkState = 'up';

            if (typeof check.history[historyLength] !== 'undefined') {
                if (check.history[historyLength].duration === null) {
                    checkState = 'down';
                } else if (check.history[historyLength].duration > 200) {
                    lastPingDuration = `${check.history[historyLength].duration} ms`;
                    lastPingSpeed = 'slow';
                } else {
                    lastPingDuration = `${check.history[historyLength].duration} ms`;
                    lastPingSpeed = 'fast';
                }
            } else {
                checkState = 'waiting';
            }

            checksArray.push(
                <CheckRow
                    key={check.id}
                    row={check}
                    isOpenCheck={isOpenCheck}
                    isNewCheck={isNewCheck}
                    lastPingDuration={lastPingDuration}
                    lastPingSpeed={lastPingSpeed}
                    checkState={checkState}
                    functions={functions}
                />
            );
        });

        return (
            <table className="c-checks">
                <thead className="c-checks__head">
                    <tr className="c-checks__row">
                        <th className="c-checks__status" />
                        <th className="c-checks__name">Name</th>
                        <th className="c-checks__domainNameOrIP">Domain name or IP</th>
                        <th className="c-checks__port">Port</th>
                        <th className="c-checks__latency">Latency</th>
                        <th className="c-checks__notifications">Alerts</th>
                        <th className="c-checks__edit" />
                        <th className="c-checks__destroy" />
                    </tr>
                </thead>
                <ReactCSSTransitionGroup
                    component="tbody"
                    className="c-checks__body"
                    transitionName="c-checks__row"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {checksArray}
                </ReactCSSTransitionGroup>
            </table>
        );
    }
}

ChecksTable.propTypes = {
    checks: PropTypes.object.isRequired,
    openCheckID: PropTypes.string,
    populateAll: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    setWorkingCheck: PropTypes.func.isRequired,
    unsetWorkingCheck: PropTypes.func.isRequired,
    updateWorkingCheck: PropTypes.func.isRequired,
    saveWorkingCheck: PropTypes.func.isRequired,
    openCheckStats: PropTypes.func.isRequired,
    closeCheckStats: PropTypes.func.isRequired,
};

export default ChecksTable;
