import React from 'react';
import ChecksActions from '../../actions/ChecksActions';
class TopButton extends React.Component {
    render() {
        return (
            <section className="c-pane-top">
                <p className="c-pane-top__title">
                    OVERALL STATISTICS<br />
                    <span className="c-pane-top__title--secondary">
                        OF THE LAST 30 DAYS
                    </span>
                </p>
                <button className="c-pane-top__button button" onClick={this._onCreateClick.bind(this)}>
                    Add a check
                </button>
            </section>
        );
    }

    _onCreateClick() {
        ChecksActions.createWorkingCheck();
    }
}

export default TopButton;
