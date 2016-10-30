import React, { PropTypes } from 'react';

const ReportsFiltersComponent = ({ reports, updateFilter }) => {
    if (reports.length < 1) {
        return null;
    }

    const checksList = {};
    reports.forEach((report) => {
        checksList[report.checkId] = report.checkName;
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
        </form>
    );
};

ReportsFiltersComponent.propTypes = {
    reports: PropTypes.array.isRequired,
    updateFilter: PropTypes.func.isRequired,
};

export default ReportsFiltersComponent;
