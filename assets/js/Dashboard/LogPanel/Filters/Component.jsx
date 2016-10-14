import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

const LogComponent = ({ log, updateFilter }) => {
    if (log.length < 1) {
        return null;
    }

    const checksList = {};
    log.forEach((logEntry) => {
        checksList[logEntry.checkId] = logEntry.checkName;
    });

    return (
        <form>
            <select name="checkId" onChange={updateFilter}>
                <option value="">Show all checks</option>
                {Object.keys(checksList).map(checkId => (<option key={checkId} value={checkId}>{checksList[checkId]}</option>))}
            </select>
        </form>
    );
};

LogComponent.propTypes = {
    log: PropTypes.array.isRequired,
    updateFilter: PropTypes.func.isRequired,
};

export default LogComponent;
