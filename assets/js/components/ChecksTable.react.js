define(['react', '../actions/ChecksActions', '../stores/ChecksStore'],
    function(React, ChecksActions, ChecksStore) {

        const CheckRow = React.createClass({
            handleChange: function(e) {
                let value = e.target.value;

                // if (e.target.value.length >= 20)
                //     value = value.slice(0, -1);

                ChecksActions.updateWorkingCheck(this.props.row.id, e.target.name, value);
            },
            render: function() {
                let lastPingDuration = '-',
                    lastPingSpeed = '',
                    checkState = 'up',
                    row = this.props.row;

                if (typeof row.history[0] !== 'undefined') {
                    if (row.history[0] === null)
                        checkState = 'down';
                    else if (row.history[0] > 200) {
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

                return (
                    <tr id={row.id}>
                        <td data-health={checkState} className="status"></td>
                        <td><input id="name" name="name" className="name" disabled={!isEditing} type="text" onChange={this.handleChange} value={row.name} /></td>
                        <td>{row.domainNameOrIP}</td>
                        <td>{row.port}</td>
                        <td data-speed={lastPingSpeed} className="response-time">
                            {lastPingDuration}
                        </td>
                        <td className={isEditing ? 'is-editing' : 'is-not-editing'}>
                            <button onClick={this._onUpdateClick} className="settings-check">✓</button>
                        </td>
                        <td className="destroy">
                            <button onClick={this._onDestroyClick} className="destroy-check"></button>
                        </td>
                    </tr>
                );
            },

            _onUpdateClick: function() {
                if (!this.props.row.hasOwnProperty('isEditing'))
                    ChecksActions.setWorkingCheck(this.props.row.id);
                else
                    ChecksActions.saveWorkingCheck(this.props.row);
            },
            _onDestroyClick: function() {
                ChecksActions.destroy(this.props.row.id);
            }
        });

        function getChecksState() {
            return {
                allChecks: ChecksStore.getAll()
            };
        }

        const ChecksTable = React.createClass({
            getInitialState: function() {
                return getChecksState();
            },
            componentWillMount: function() {
                ChecksActions.populateAll();
                setInterval(ChecksActions.populateAll, 60*1000);
            },
            componentDidMount: function() {
                ChecksStore.addChangeListener(this._onChange);
            },
            componentWillUnmount: function() {
                ChecksStore.removeChangeListener(this._onChange);
            },

            render: function() {
                if (Object.keys(this.state.allChecks).length < 1) {
                    return null;
                }

                const allChecks = this.state.allChecks;
                const checks = [];

                for(let singleCheck in allChecks) {
                    if (allChecks.hasOwnProperty(singleCheck)) {
                        checks.push(<CheckRow row={allChecks[singleCheck]} key={allChecks[singleCheck].id} />);
                    }
                }

                return (
                    <table id="checks">
                        <thead><tr><th>Status</th><th>Name</th><th>Domain name or IP</th><th>Port</th><th>Latency</th><th></th><th></th></tr></thead>
                        <tbody>{checks}</tbody>
                    </table>
                );
            },
            _onChange: function() {
                this.setState(getChecksState());
            }
        });

        return ChecksTable;
    }
);
