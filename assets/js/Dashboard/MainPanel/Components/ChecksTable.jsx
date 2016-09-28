import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CheckRow extends React.Component {
    componentDidMount() {
        // We wait for the input to be initialized
        setTimeout(() => { this.checknameInput.focus(); }, 0);
    }
    onCheckRowClick() {
        if (!this.props.isOpenCheck) {
            this.props.functions.openCheckStats(this.props.row.id);
        } else {
            this.props.functions.closeCheckStats();
        }
    }
    onEditClick(e) {
        e.stopPropagation();
        if (!this.props.row.isEditing) {
            this.props.functions.setWorkingCheck(this.props.row.id);
            // We wait for the input to be enabled
            setTimeout(() => { this.checknameInput.focus(); }, 0);
        } else {
            this.props.functions.saveWorkingCheck(this.props.row);
        }
    }
    handleChange(e) {
        const inputType = e.target.type;
        const inputName = e.target.name;
        let inputValue = e.target.value;

        if (inputType === 'checkbox') {
            inputValue = e.target.checked;
        } else if (inputType === 'number') {
            inputValue = Number(inputValue);
        }

        this.props.functions.updateWorkingCheck(this.props.row.id, inputName, inputValue);
    }
    handleKeyPress(e) {
        if (e.keyCode === 13) {
            this.props.functions.saveWorkingCheck(this.props.row);
        }
    }

    render() {
        return (
            <tr
                className={`c-checks__row ${this.props.isOpenCheck ? 's-is-open' : ''}`}
                id={this.props.row.id}
                onClick={() => this.onCheckRowClick()}
            >
                <td className="c-checks__status" data-health={this.props.checkState} />
                <td className="c-checks__name">
                    <input
                        className="input__text input__text--dark"
                        name="name"
                        disabled={!this.props.row.isEditing}
                        type="text"
                        onChange={e => this.handleChange(e)}
                        onKeyDown={e => this.handleKeyPress(e)}
                        value={this.props.row.name}
                        placeholder="e.g. HTTP @ Google"
                        ref={ref => this.checknameInput = ref}
                    />
                </td>
                <td className="c-checks__domainNameOrIP">
                    <input
                        className="input__text input__text--dark"
                        name="domainNameOrIP"
                        disabled={!this.props.row.isEditing || !this.props.isNewCheck}
                        type="text"
                        onChange={e => this.handleChange(e)}
                        onKeyDown={e => this.handleKeyPress(e)}
                        value={this.props.row.domainNameOrIP}
                        placeholder="e.g. google.fr"
                    />
                </td>
                <td className="c-checks__port">
                    <input
                        className="input__text input__text--number input__text--dark"
                        name="port"
                        disabled={!this.props.row.isEditing || !this.props.isNewCheck}
                        type="number"
                        onChange={e => this.handleChange(e)}
                        onKeyDown={e => this.handleKeyPress(e)}
                        value={this.props.row.port}
                        min="1"
                        max="65535"
                        placeholder="e.g. 80"
                    />
                </td>
                <td className="c-checks__latency" data-speed={this.props.lastPingSpeed}>
                    {this.props.lastPingDuration}
                </td>
                <td
                    className="c-checks__notifications"
                    onClick={e => e.stopPropagation()}
                >
					<div className={`
                        c-checkbox
                        ${this.props.row.emailNotifications ? 'is-checked' : ''}
                        ${this.props.row.isEditing ? '' : 'is-disabled'}
                    `}>
						<input
							className="input__checkbox"
							id={`emailNotifications-${this.props.row.id}`}
							name="emailNotifications"
							disabled={!this.props.row.isEditing}
							type="checkbox"
							onChange={e => this.handleChange(e)}
							checked={this.props.row.emailNotifications}
						/>
						<label
							htmlFor={`emailNotifications-${this.props.row.id}`}
							className="c-checkbox__label"
						/>
					</div>
                </td>
                <td className="c-checks__edit">
                    <button
                        onClick={e => this.onEditClick(e)}
                        className={`c-settings-check ${this.props.row.isEditing ? 'is-editing' : 'is-not-editing'}`}
                    >
                        {this.props.row.isEditing ? 'OK' : ''}
                    </button>
                </td>
                <td
                    className="c-checks__destroy"
                >
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            this.props.functions.destroy(this.props.row.id);
                        }}
                        className="destroy-check"
                    / >
                </td>
            </tr>
        );
    }
}

CheckRow.propTypes = {
    row: PropTypes.shape({
        domainNameOrIP: PropTypes.string.isRequired,
        emailNotifications: PropTypes.bool,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        isEditing: PropTypes.bool,
    }),
    isOpenCheck: PropTypes.bool.isRequired,
    isNewCheck: PropTypes.bool.isRequired,
    lastPingDuration: PropTypes.string.isRequired,
    lastPingSpeed: PropTypes.string.isRequired,
    checkState: PropTypes.string.isRequired,
    functions: PropTypes.shape({
        destroy: PropTypes.func.isRequired,
        setWorkingCheck: PropTypes.func.isRequired,
        updateWorkingCheck: PropTypes.func.isRequired,
        saveWorkingCheck: PropTypes.func.isRequired,
        openCheckStats: PropTypes.func.isRequired,
        closeCheckStats: PropTypes.func.isRequired,
    }),
};

const ChecksTable = ({ checks = {}, openCheckID, destroy, setWorkingCheck, updateWorkingCheck, saveWorkingCheck, openCheckStats, closeCheckStats }) => {
    if (Object.keys(checks).length < 1) {
        return null;
    }

    const checksArray = [];
    const functions = {
        destroy,
        setWorkingCheck,
        updateWorkingCheck,
        saveWorkingCheck,
        openCheckStats,
        closeCheckStats,
    };

    for (const singleCheck in checks) {
        if (Object.prototype.hasOwnProperty.call(checks, singleCheck)) {
            const isOpenCheck = checks[singleCheck].id === openCheckID;
            const isNewCheck = checks[singleCheck].id === 'tmpID';

            let lastPingDuration = '-';
            let lastPingSpeed = '';
            let checkState = 'up';

            if (typeof checks[singleCheck].history[0] !== 'undefined') {
                if (checks[singleCheck].history[0].duration === null) {
                    checkState = 'down';
                } else if (checks[singleCheck].history[0].duration > 200) {
                    lastPingDuration = `${checks[singleCheck].history[0].duration} ms`;
                    lastPingSpeed = 'slow';
                } else {
                    lastPingDuration = `${checks[singleCheck].history[0].duration} ms`;
                    lastPingSpeed = 'fast';
                }
            } else {
                checkState = 'waiting';
            }

            checksArray.push(
                <CheckRow
                    key={checks[singleCheck].id}
                    row={checks[singleCheck]}
                    isOpenCheck={isOpenCheck}
                    isNewCheck={isNewCheck}
                    lastPingDuration={lastPingDuration}
                    lastPingSpeed={lastPingSpeed}
                    checkState={checkState}
                    functions={functions}
                />
            );
        }
    }

    // TODO: move all JSX down to the view componenet
    return (
        <table className="c-checks">
            <thead className="c-checks__head">
                <tr className="c-checks__row">
                    <th className="c-checks__status">Status</th>
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
};

ChecksTable.propTypes = {
    checks: PropTypes.object.isRequired,
    openCheckID: PropTypes.string,
    destroy: PropTypes.func.isRequired,
    setWorkingCheck: PropTypes.func.isRequired,
    updateWorkingCheck: PropTypes.func.isRequired,
    saveWorkingCheck: PropTypes.func.isRequired,
    openCheckStats: PropTypes.func.isRequired,
    closeCheckStats: PropTypes.func.isRequired,
};

export default ChecksTable;
