import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';


class LogComponent extends Component {
    static propTypes = {
        reports: PropTypes.array.isRequired,
        reportsFilters: PropTypes.object.isRequired,
        hydrateReports: PropTypes.func.isRequired,
    }

    componentDidMount() {
        // We check whether an autoRefresh loop is already running
        if (typeof this.autoRefresh === 'undefined' || !this.autoRefresh) {
            this.props.hydrateReports();
            this.autoRefresh = setInterval(this.props.hydrateReports, 2 * 60 * 1000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.autoRefresh);
        this.autoRefresh = false;
    }
	render() {
        const { reports, reportsFilters } = this.props;

        if (reports.length < 1) {
            return (
                <div className="centered__wrapper">
                    <p className="centered">
                        Nothing to show yet!<br/>
                        But stay around, reports are generated every 1<sup>st</sup> of each month.<br /><br /><br /><br />
                        <img width="300" src="/images/log-empty.svg" alt="No log entry to show yet!" />
                    </p>
                </div>
            );
        }

        let filteredReports = reports.filter(report =>
                reportsFilters.checkId === report.checkId || reportsFilters.checkId === null
        );

        return (
            <table className="c-table c-reports">
                <thead className="c-table__head">
                    <tr className="c-table__row">
                        <th className="c-reports__date">Date</th>
                        <th className="c-reports__name">Check name</th>
                        <th className="c-reports__availability">Availability</th>
                        <th className="c-reports__avg">Avg latency</th>
                    </tr>
                </thead>
                <ReactCSSTransitionGroup
                    component="tbody"
                    className="c-table__body"
                    transitionName="c-table__row"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {filteredReports.reverse().map((report, i) => (
                        <tr className="c-table__row" key={i}>
                            <td className="c-reports__date">{moment(report.date).format('MMMM Do, HH:mm')}</td>
                            <td>{report.checkName}</td>
                            <td>{report.availability}% ({report.numberOfOutages} outage{report.numberOfOutages !== 1 && 's'})</td>
                            <td>{report.avg} ms</td>
                        </tr>
                    ))}
                </ReactCSSTransitionGroup>
            </table>
        );
    }
}

export default LogComponent;
