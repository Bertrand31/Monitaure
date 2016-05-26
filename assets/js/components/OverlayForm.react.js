define(['react', '../actions/ChecksActions', '../stores/ChecksStore'],
    function(React, ChecksActions, ChecksStore) {

        function getCheckState() {
            return {
                selectedCheck: ChecksStore.getSelected()
            };
        }

        const OverlayForm = React.createClass({
            getInitialState: function() {
                return getCheckState();
            },
            componentDidMount: function() {
                // BUG
                // ChecksStore.addChangeListener(this._onUpdateSubmit);
                // ChecksStore.addChangeListener(this.getInitialState);
                ChecksStore.addChangeListener(this.handleChange);
            },
            componentWillUnmount: function() {
                // ChecksStore.removeChangeListener(this._onUpdateSubmit);
                ChecksStore.removeChangeListener(this.getInitialState);
            },
            handleChange: function(event) {
                this.setState({value: event.target.value});
            },

            render: function() {
                if (this.state.selectedCheck === null) {
                    return null;
                }

                return (
                    <div className="fullscreen" id="check-update-form">
                        <div className="centered-box">
                            <button className="close-fullscreen" />
                            <h2 className="form-title">Update a check</h2>
                            <form OnSubmit={this._onCreateSubmit}>
                                <fieldset className="check-data">
                                    <label for="name">Check name</label>
                                    <input type="text" id="name" name="name" placeholder="e.g. HTTP @ Google.fr" value={this.state.selectedCheck.name} onChange={this._onChange} autofocus maxlength="20" />
                                    <label for="domainNameOrIP">Domain name or IP address</label>
                                    <input type="text" id="domainNameOrIP" name="domainNameOrIP" placeholder="e.g. 216.58.211.99" value={this.state.selectedCheck.domainNameOrIP} onChange={this._onChange} />
                                    <label for="port">Port number</label>
                                    <input type="number" id="port" name="port" placeholder="e.g. 80" value={this.state.selectedCheck.port} onChange={this._onChange} maxlength="5" />
                                </fieldset>
                                <fieldset className="notifications">
                                    <label className="checkbox-label" for="emailNotifications">Send email alerts?</label>
                                    <div className="rounded-checkbox">
                                        <input id="emailNotifications" type="checkbox" name="emailNotifications" value={this.state.emailNotifications} onChange={this._onChange} />
                                        <label htmlFor="emailNotifications"></label>

                                    </div>
                                </fieldset>
                                <input type="submit" value="Update" onClick={this._onUpdateSubmit} />
                            </form>
                        </div>
                    </div>
                );

            },
            _onUpdateSubmit: function() {
                // this.setState(getChecksState());
                ChecksActions.update(this.state);
            },
        });

        return OverlayForm;
    }
);
