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
        <form className="c-filters">
            <div className="c-input input-select__wrapper">
                <select className="input-select" name="checkId" onChange={updateFilter}>
                    <option value="">All checks</option>
                    {Object.keys(checksList).map(checkId => (
                        <option key={checkId} value={checkId}>{checksList[checkId]}</option>
                    ))}
                </select>
            </div>
            {Object.keys(typesList).map((type, i) => (
                <div className="c-input input-checkbox" key={i}>
                    <input className="input-checkbox__box" type="checkbox" defaultChecked name={type} id={type} onChange={toggleType} />
                    <label className="input-checkbox__label" htmlFor={type}>Show {type.toUpperCase()} alerts</label>
                </div>
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
