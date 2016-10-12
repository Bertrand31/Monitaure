import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';


class LogComponent extends Component {
    componentDidMount() {
        // We check whether an autoRefresh loop is already running
        if (typeof this.autoRefresh === 'undefined' || !this.autoRefresh) {
            this.props.hydrateLog();
            this.autoRefresh = setInterval(this.props.hydrateLog, 2 * 60 * 1000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.autoRefresh);
        this.autoRefresh = false;
    }
	render() {
        if (this.props.log.length < 1) {
            return null;
        }

        return (
            <table className="c-table c-log">
                <thead className="c-table__head">
                    <tr className="c-table__row">
                        <th className="c-log__type" />
                        <th className="c-log__name">Date</th>
                        <th className="c-log__message">Message</th>
                    </tr>
                </thead>
                <ReactCSSTransitionGroup
                    component="tbody"
                    className="c-table__body"
                    transitionName="c-table__row"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {this.props.log.map((logEntry, i) => (
                        <tr className="c-table__row" key={i}>
                            <td>{logEntry.type}</td>
                            <td>{moment(logEntry.date).format('MMMM Do, h:mm a')}</td>
                            <td>{logEntry.message}</td>
                        </tr>
                    ))}
                </ReactCSSTransitionGroup>
            </table>
        );
    }
}

LogComponent.propTypes = {
    log: PropTypes.array.isRequired,
    hydrateLog: PropTypes.func.isRequired,
};

export default LogComponent;
