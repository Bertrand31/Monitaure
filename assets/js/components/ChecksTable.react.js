define(['react', '../actions/ChecksActions', '../stores/ChecksStore', '../serverIO/ajaxMethods', '../serverIO/dataHandling'],
    function(React, ChecksActions, ChecksStore, ajaxMethods, dataHandling) {

        function getChecksState() {
            return {
                allChecks: ChecksStore.getAll()
            };
        }

        const ChecksTable = React.createClass({
            getInitialState: function() {
                return getChecksState();
            },
            componentDidMount: function() {
                ChecksStore.addChangeListener(this._onChange);
                dataHandling.getAllStats(ajaxMethods.GETer, function(err, data) {
                    //if (err) TODO
                    // TODO: améliorer la route pour ne retourner que les checks
                    ChecksActions.populateAll(data.userData.checks);
                });
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

                for(let key in allChecks) {
                    if (allChecks.hasOwnProperty(key)) {
                        checks.push(<CheckRow row={allChecks[key]} key={allChecks[key].id} />);
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
        const CheckRow = React.createClass({
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

                return (
                    <tr id={row.id}>
                        <td data-health={checkState} className="status"></td>
                        <td className="name">{row.name}</td>
                        <td>{row.domainNameOrIP}</td>
                        <td>{row.port}</td>
                        <td data-speed={lastPingSpeed} className="response-time">
                            {lastPingDuration}
                        </td>
                        <td className="settings">
                            <button onClick={this._onUpdateClick} className="settings-check"></button>
                        </td>
                        <td className="destroy">
                            <button onClick={this._onDestroyClick} className="destroy-check"></button>
                        </td>
                    </tr>
                );
            },

            _onUpdateClick: function() {
                //TEMPORARY
                CheckActions.update(this.props.row.id, "TODO", true);
            },
            _onDestroyClick: function() {
                CheckActions.destroy(this.props.row.id);
            }
        });

        return ChecksTable;
    }
);
