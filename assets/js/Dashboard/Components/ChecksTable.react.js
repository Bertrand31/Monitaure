import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CheckRow extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // We wait for the input to be initialized
        setTimeout(() => { this.refs.checknameInput.focus(); }, 50);
    }
    handleChange(e) {
        const inputType = e.target.type;
        const inputName = e.target.name;
        let inputValue = e.target.value;

        if (inputType === 'checkbox') {
            inputValue = e.target.checked;
        }

        this.props.functions.updateWorkingCheck(this.props.row.id, inputName, inputValue);
    }
    render() {
        const row = this.props.row;

        return (
            <tr className="c-checks__row" id={row.id} onClick={this._onCheckRowClick.bind(this)}>
                <td className="c-checks__status" data-health={this.props.checkState}></td>
                <td className="c-checks__name">
                    <input
                        className="input__text input__text--dark"
                        id="name"
                        name="name"
                        disabled={!row.isEditing}
                        type="text"
                        onChange={this.handleChange.bind(this)}
                        value={row.name}
                        placeholder="e.g. HTTP @ Google"
                        ref="checknameInput"
                    />
                </td>
                <td className="c-checks__domainNameOrIP">
                    <input
                        className="input__text input__text--dark"
                        id="domainNameOrIP"
                        name="domainNameOrIP"
                        disabled={!row.isEditing || !this.props.isNewCheck}
                        type="text"
                        onChange={this.handleChange.bind(this)}
                        value={row.domainNameOrIP}
                        placeholder="e.g. google.fr"
                    />
                </td>
                <td className="c-checks__port">
                    <input
                        className="input__text input__text--number input__text--dark"
                        id="port"
                        name="port"
                        disabled={!row.isEditing || !this.props.isNewCheck}
                        type="number"
                        onChange={this.handleChange.bind(this)}
                        value={row.port}
                        placeholder="e.g. 80"
                    />
                </td>
                <td className="c-checks__latency" data-speed={this.props.lastPingSpeed} className="response-time">
                    {this.props.lastPingDuration}
                </td>
                <td className="c-checks__notifications">
                    <input
                        className="input__checkbox"
                        id="emailNotifications"
                        name="emailNotifications"
                        disabled={!row.isEditing}
                        type="checkbox"
                        onChange={this.handleChange.bind(this)}
                        checked={row.emailNotifications}
                    />
                </td>
                <td className={row.isEditing ? 'c-checks__edit is-editing' : 'c-checks__edit is-not-editing'}>
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            if (!row.isEditing) {
                                this.props.functions.setWorkingCheck(row.id);
                                // We wait for the input to be enabled
                                setTimeout(() => { this.refs.checknameInput.focus(); }, 50);
                            } else {
                                this.props.functions.saveWorkingCheck(row);
                            }
                        }}
                        className="settings-check"
                    >
                        ✓
                    </button>
                </td>
                <td className="c-checks__destroy">
                    <button onClick={(e) => {
                            e.stopPropagation();
                            this.props.functions.destroy(row.id);
                        }}
                        className="destroy-check"
                    ></button>
                </td>
            </tr>
        );
    }

    _onCheckRowClick() {
        if (!this.props.isOpenCheck) {
            this.props.functions.openCheckStats(this.props.row.id);
        } else {
            this.props.functions.closeCheckStats();
        }
    }
    _onEditClick(e) {
        e.stopPropagation();
        if (!this.props.row.isEditing) {
            this.props.functions.setWorkingCheck(this.props.row.id);
            // We wait for the input to be enabled
            setTimeout(() => { this.refs.checknameInput.focus(); }, 50);
        } else {
            this.props.functions.saveWorkingCheck(this.props.row);
        }
    }
}

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
        closeCheckStats
    };

    for (const singleCheck in checks) {
        if (checks.hasOwnProperty(singleCheck)) {

            const isOpenCheck = Boolean(checks[singleCheck].id === openCheckID);
            const isNewCheck = Boolean(checks[singleCheck].id === 'tmpID');

            let lastPingDuration = '-';
            let lastPingSpeed = '';
            let checkState = 'up';

            if (typeof checks[singleCheck].history[0] !== 'undefined') {
                if (checks[singleCheck].history[0].duration === null)
                    checkState = 'down';
                else if (checks[singleCheck].history[0].duration > 200) {
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
                    <th className="c-checks__notifications">Notifications</th>
                    <th className="c-checks__edit"></th>
                    <th className="c-checks__destroy"></th>
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
}

export default ChecksTable;
