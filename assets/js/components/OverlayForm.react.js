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
                ChecksStore.addChangeListener(this._onUpdateSubmit);
            },
            componentWillUnmount: function() {
                ChecksStore.removeChangeListener(this._onUpdateSubmit);
            },
            handleChange: function(event) {
                this.setState({value: event.target.value});
            },

            render: function() {
                if (typeof this.state.selectedCheck === 'undefined') {
                    return null;
                }

                return (
                    <div className="fullscreen-wrapper" id="check-update-form">
                        <div className="centered-box">
                            <button className="close-fullscreen" />
                            <h2 className="form-title">Update a check</h2>
                            <form OnSubmit={this._onCreateSubmit}>
                                <fieldset className="check-data">
                                    <label for="name">Check name</label>
                                    <input id="name" name="name" value={this.state.selectedCheck.name} onChange={this.handleChnage} />
                                    <label for="domainNameOrIP">Domain name or IP address</label>
                                    <input id="domainNameOrIP" name="domainNameOrIP" value={this.state.selectedCheck.domainNameOrIP} onChange={this.handleChange} />
                                    <label for="port">Port number</label>
                                    <input id="port" name="port" value={this.state.selectedCheck.port} onChange={this.handleChange}/>
                                </fieldset>
                                <fieldset className="notifications">
                                    <label className="checkbox-label" for="emailNotifications">Send email alerts?</label>
                                    <div className="rounded-checkbox">
                                        <input id="emailNotifications" type="checkbox" name="emailNotifications" value={this.state.emailNotifications} onChange={this.handleChange} />
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
