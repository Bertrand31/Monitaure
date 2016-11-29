import React, { Component, PropTypes } from 'react';

class CheckRow extends Component {
    static propTypes = {
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
            unsetWorkingCheck: PropTypes.func.isRequired,
            updateWorkingCheck: PropTypes.func.isRequired,
            saveWorkingCheck: PropTypes.func.isRequired,
            openCheckStats: PropTypes.func.isRequired,
            closeCheckStats: PropTypes.func.isRequired,
        }),
    }

    componentDidMount() {
        // We wait for the input to be initialized
        setTimeout(() => { this.checknameInput.focus(); }, 0);
    }
    onCheckRowClick(e) {
        if (e.target.classList.contains('destroy-check')) {
            return;
        }
        if (!this.props.isOpenCheck) {
            this.props.functions.openCheckStats(this.props.row);
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

        return this.props.functions.updateWorkingCheck(this.props.row.id, inputName, inputValue);
    }
    handleKeyPress(e) {
        if (e.keyCode === 13) {
            return this.props.functions.saveWorkingCheck(this.props.row);
        } else if (e.keyCode === 27) {
            if (this.props.row.id === 'tmpID') {
                return this.props.functions.destroy('tmpID');
            } else {
                return this.props.functions.unsetWorkingCheck(this.props.row.id);
            }
        }
    }
    handleDestroy() {
        if (this.props.isOpenCheck) {
            this.props.functions.closeCheckStats();
        }
        return this.props.functions.destroy(this.props.row.id);
    }

    render() {
        return (
            <tr
                className={`c-table__row ${this.props.isOpenCheck ? 's-is-open' : ''}`}
                id={this.props.row.id}
                onClick={this.onCheckRowClick.bind(this)}
            >
                <td className="c-checks__status" data-health={this.props.checkState} />
                <td className="c-checks__name">
                    <input
                        className="input__text input__text--dark"
                        name="name"
                        disabled={!this.props.row.isEditing}
                        type="text"
                        onClick={e => e.stopPropagation()}
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleKeyPress.bind(this)}
                        defaultValue={this.props.row.name}
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
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleKeyPress.bind(this)}
                        defaultValue={this.props.row.domainNameOrIP}
                        placeholder="e.g. google.fr"
                    />
                </td>
                <td className="c-checks__port">
                    <input
                        className="input__text input__text--number input__text--dark"
                        name="port"
                        disabled={!this.props.row.isEditing || !this.props.isNewCheck}
                        type="number"
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleKeyPress.bind(this)}
                        defaultValue={this.props.row.port}
                        min="1"
                        max="65535"
                    />
                </td>
                <td className="c-checks__latency" data-speed={this.props.lastPingSpeed}>
                    {this.props.lastPingDuration}
                </td>
                <td
                    className="c-checks__notifications"
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className={`c-checkbox
                        ${this.props.row.emailNotifications ? 'is-checked' : ''}
                        ${this.props.row.isEditing ? '' : 'is-disabled'}`}
                    >
                        <input
                            className="input__checkbox"
                            id={`emailNotifications-${this.props.row.id}`}
                            name="emailNotifications"
                            disabled={!this.props.row.isEditing}
                            type="checkbox"
                            onChange={this.handleChange.bind(this)}
                            defaultChecked={this.props.row.emailNotifications}
                        />
                        <label
                            htmlFor={`emailNotifications-${this.props.row.id}`}
                            className="c-checkbox__label"
                        />
                    </div>
                </td>
                <td className="c-checks__edit">
                    <button
                        onClick={this.onEditClick.bind(this)}
                        className={`c-settings-check ${this.props.row.isEditing ? 'is-editing' : 'is-not-editing'}`}
                    >
                        {this.props.row.isEditing ? 'OK' : ''}
                    </button>
                </td>
                <td
                    className="c-checks__destroy"
                >
                    <button
                        onClick={this.handleDestroy.bind(this)}
                        className="destroy-check"
                    / >
                </td>
            </tr>
        );
    }
}

export default CheckRow;
