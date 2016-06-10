define(['react'], function(React) {

    const Navigation = React.createClass({

        render() {
            return (
                <div className="sidebar__nav--wrapper">
                    <nav className="main-nav">
                        <ul>
                            <li className="active">
                                <a href="/" id="dashboard-pane" onClick={this._onPaneChange}>Dashboard</a>
                            </li>
                            <li className="disabled">
                                <a href="/reports" id="reports-pane" onClick={this._onPaneChange}>Reports<span className="info">14</span></a>
                            </li>
                            <li className="disabled">
                                <a href="/messages" id="messages-pane" onClick={this._onPaneChange}>Messages<span className="info">132</span></a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="misc-nav">
                        <ul>
                            <li className="disabled">
                                <a href="/settings" id="settings-pane" onClick={this._onPaneChange}>Settings</a>
                            </li>
                            <li>
                                <a href="https://github.com/Bertrand31/Monitaure/issues" target="_blank">Help</a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="auth-nav">
                        <ul>
                            <li>
                                <a href="/logout">Log out</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
        },

        _onPaneChange(e) {
            e.preventDefault();
            history.pushState({ id: e.currentTarget.id }, null, e.currentTarget.href);
        }
    });

    return Navigation;
});
