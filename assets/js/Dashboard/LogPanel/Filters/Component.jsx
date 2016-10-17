import React, { PropTypes } from 'react';

const LogComponent = ({ log, updateFilter, toggleType }) => {
    if (log.length < 1) {
        return null;
    }

    const checksList = {};
    const typesList = {};
    log.forEach((logEntry) => {
        checksList[logEntry.checkId] = logEntry.checkName;
        typesList[logEntry.type] = logEntry.type;
    });


    return (
        <form>
            <select name="checkId" onChange={updateFilter}>
                <option value="">Show all checks</option>
                {Object.keys(checksList).map(checkId => (
                    <option key={checkId} value={checkId}>{checksList[checkId]}</option>
                ))}
            </select>
            {Object.keys(typesList).map((type, i) => (
                <label key={i} htmlFor={type}>
                    Show {type}?
                    <input type="checkbox" defaultChecked name={type} id={type} onChange={toggleType} />
                </label>
            ))}
        </form>
    );
};

LogComponent.propTypes = {
    log: PropTypes.array.isRequired,
    updateFilter: PropTypes.func.isRequired,
    toggleType: PropTypes.func.isRequired,
};

export default LogComponent;
