import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';


class LogComponent extends Component {
    static propTypes = {
        log: PropTypes.array.isRequired,
        logFilters: PropTypes.object.isRequired,
        hydrateLog: PropTypes.func.isRequired,
    }

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
        const { log, logFilters } = this.props;

        if (log.length < 1) {
            return (
                <div className="centered__wrapper">
                    <p className="centered">
                        Ooops 😱 Nothing to show yet!<br /><br /><br /><br />
                        <img width="300" src="/images/log-empty.svg" alt="No log entry to show yet!" />
                    </p>
                </div>
            );
        }

        let filteredLog = log.filter(logEntry =>
                (logFilters.checkId === logEntry.checkId || logFilters.checkId === null) &&
                !logFilters.hiddenTypes.includes(logEntry.type));

        return (
            <table className="c-table c-log">
                <thead className="c-table__head">
                    <tr className="c-table__row">
                        <th className="c-log__type" />
                        <th className="c-log__date">Date</th>
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
                    {filteredLog.reverse().map((logEntry, i) => (
                        <tr className="c-table__row" key={i}>
                            <td className={`c-cell--pictogram c-cell-${logEntry.type}`} />
                            <td className="c-log__date">{moment(logEntry.date).format('MMMM Do, HH:mm')}</td>
                            <td>{logEntry.message}</td>
                        </tr>
                    ))}
                </ReactCSSTransitionGroup>
            </table>
        );
    }
}

export default LogComponent;
