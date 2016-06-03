define(['react', '../actions/ChecksActions', '../stores/ChecksStore', '../stores/FormsStore'],
    function(React, ChecksActions, ChecksStore, FormsStore) {

        function getCheckState() {
            return {
                selectedCheck: ChecksStore.getWorkingCheck()
            };
        }

        const UpdateForm = React.createClass({

            getInitialState: function() {
                return getCheckState();
            },
            // componentDidMount: function() {
            //     ChecksStore.addChangeListener(this.handleChange);
            // },
            // componentWillUnmount: function() {
            //     ChecksStore.removeChangeListener(this.handleChange);
            // },
            handleChange: function(e) {
                ChecksActions.updateWorkingCheck(e.target.name, e.target.value);
            },
            handleSubmit: function(e) {
                e.preventDefault();
                ChecksActions.saveWorkingCheck();
            },

            render: function() {
                if (this.props.workingCheck === null) {
                    return null;
                }

                return (
                    <div className="centered-box">
                        <button className="close-fullscreen" />
                        <h2 className="form-title">Update a check</h2>
                        <form onSubmit={this.handleSubmit}>
                            <fieldset className="check-data">
                                <label for="name">Check name</label>
                                <input type="text" id="name" name="name" placeholder="e.g. HTTP @ Google.fr" value={this.state.selectedCheck.name} onChange={this.handleChange} autofocus maxlength="20" />
                                <label for="domainNameOrIP">Domain name or IP address</label>
                                <input type="text" id="domainNameOrIP" name="domainNameOrIP" placeholder="e.g. 216.58.211.99" value={this.state.selectedCheck.domainNameOrIP} onChange={this.handleChange} />
                                <label for="port">Port number</label>
                                <input type="number" id="port" name="port" placeholder="e.g. 80" value={this.state.selectedCheck.port} onChange={this.handleChange} maxlength="5" />
                            </fieldset>
                            <fieldset className="notifications">
                                <label className="checkbox-label" for="emailNotifications">Send email alerts?</label>
                                <div className="rounded-checkbox">
                                    <input id="emailNotifications" type="checkbox" name="emailNotifications" value={this.state.emailNotifications} onChange={this.handleChange} />
                                    <label htmlFor="emailNotifications"></label>

                                </div>
                            </fieldset>
                            <input type="submit" value="Update" />
                        </form>
                    </div>
                );
            }
        });

        function getFormsState() {
            return {
                currentFormType: FormsStore.getCurrent()
            };
        }

        const OverlayForm = React.createClass({
            getInitialState: function() {
                return getFormsState();
            },
            componentDidMount: function() {
                FormsStore.addChangeListener(this.handleChange);
            },
            componentWillUnmount: function() {
                FormsStore.removeChangeListener(this.handleChange);
            },

            handleChange: function() {
                this.setState(getFormsState());
            },

            render: function() {
                if (this.state.currentFormType === null) {
                    return null;
                }

                let currentForm;
                if (this.state.currentFormType === 'update')
                    currentForm = <UpdateForm />;

                return (
                    <div className="fullscreen" id="check-update-form">
                        {currentForm}
                    </div>
                );

            }
        });

        return OverlayForm;
    }
);
