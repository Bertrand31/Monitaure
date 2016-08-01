import React, { PropTypes } from 'react';

const TopButton = ({ createWorkingCheck }) => (
    <section className="c-pane-top">
        <p className="c-pane-top__title">
            OVERALL STATISTICS<br />
            <span className="c-pane-top__title--secondary">
                OF THE LAST 30 DAYS
            </span>
        </p>
        <button className="c-pane-top__button button" onClick={createWorkingCheck}>
            Add a check
        </button>
    </section>
);

TopButton.propTypes = {
    createWorkingCheck: PropTypes.func.isRequired,
};

export default TopButton;
