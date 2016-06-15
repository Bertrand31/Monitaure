define(['react', '../../actions/ChecksActions'],
    function(React, ChecksActions) {

        class CheckRow extends React.Component {
            constructor(props) {
                super(props);
            }
            handleChange(e) {
                const inputType = e.target.type;
                const inputName = e.target.name;
                let inputValue = e.target.value;

                if (inputType === 'checkbox') {
                    inputValue = e.target.checked;
                }

                ChecksActions.updateWorkingCheck(this.props.row.id, inputName, inputValue);
            }
            render() {
                const row = this.props.row;
                let lastPingDuration = '-';
                let lastPingSpeed = '';
                let checkState = 'up';

                if (typeof row.history[0] !== 'undefined') {
                    if (row.history[0].duration === null)
                        checkState = 'down';
                    else if (row.history[0].duration > 200) {
                        lastPingDuration = `${row.history[0].duration} ms`;
                        lastPingSpeed = 'slow';
                    } else {
                        lastPingDuration = `${row.history[0].duration} ms`;
                        lastPingSpeed = 'fast';
                    }
                } else {
                    checkState = 'waiting';
                }

                const isEditing = this.props.row.hasOwnProperty('isEditing');
                const isNewCheck = this.props.row.id === 'tmpID';

                return (
                    <tr className="c-checks__row" id={row.id} onClick={this._onOpenClick.bind(this)}>
                        <td className="c-checks__status" data-health={checkState}></td>
                        <td className="c-checks__name">
                            <input
                                className="input__text input__text--dark"
                                id="name"
                                name="name"
                                disabled={!isEditing}
                                type="text"
                                onChange={this.handleChange.bind(this)}
                                value={row.name}
                                placeholder="e.g. HTTP @ Google"
                            />
                        </td>
                        <td className="c-checks__domainNameOrIP">
                            <input
                                className="input__text input__text--dark"
                                id="domainNameOrIP"
                                name="domainNameOrIP"
                                disabled={!isEditing || !isNewCheck}
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
                                disabled={!isEditing || !isNewCheck}
                                type="number"
                                onChange={this.handleChange.bind(this)}
                                value={row.port}
                                placeholder="e.g. 80"
                            />
                        </td>
                        <td className="c-checks__latency" data-speed={lastPingSpeed} className="response-time">
                            {lastPingDuration}
                        </td>
                        <td className="c-checks__notifications">
                            <input
                                className="input__checkbox"
                                id="emailNotifications"
                                name="emailNotifications"
                                disabled={!isEditing}
                                type="checkbox"
                                onChange={this.handleChange.bind(this)}
                                checked={row.emailNotifications}
                            />
                        </td>
                        <td className={isEditing ? 'c-checks__edit is-editing' : 'c-checks__edit is-not-editing'}>
                            <button onClick={this._onEditClick.bind(this)} className="settings-check">✓</button>
                        </td>
                        <td className="c-checks__destroy">
                            <button onClick={this._onDestroyClick.bind(this)} className="destroy-check"></button>
                        </td>
                    </tr>
                );
            }

            _onOpenClick() {
                ChecksActions.openStats(this.props.row.id);
            }
            _onEditClick(e) {
                e.stopPropagation();
                if (!this.props.row.hasOwnProperty('isEditing'))
                    ChecksActions.setWorkingCheck(this.props.row.id);
                else
                    ChecksActions.saveWorkingCheck(this.props.row);
            }
            _onDestroyClick(e) {
                e.stopPropagation();
                ChecksActions.destroy(this.props.row.id);
            }
        }

        class ChecksTable extends React.Component {
            constructor(props) {
                super(props);
            }
            render() {
                const allChecks = this.props.allChecks;

                if (Object.keys(allChecks).length < 1) {
                    return null;
                }

                const checks = [];

                for (const singleCheck in allChecks) {
                    if (allChecks.hasOwnProperty(singleCheck)) {
                        checks.push(<CheckRow row={allChecks[singleCheck]} key={allChecks[singleCheck].id} />);
                    }
                }

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
                        <tbody className="c-checks__body">
                            {checks}
                        </tbody>
                    </table>
                );
            }
        }

        return ChecksTable;
    }
);
