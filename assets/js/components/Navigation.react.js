define(['react'], function(React) {

    const Navigation = React.createClass({

        render() {
            return (
                <div className="sidebar__nav--wrapper">
                    <nav className="main-nav">
                        <ul>
                            <li className="active">
                                <a href="/" id="dashboard-pane">Dashboard</a>
                            </li>
                            <li className="disabled">
                                <a href="/reports" id="reports-pane">Reports<span className="info">14</span></a>
                            </li>
                            <li className="disabled">
                                <a href="/messages" id="messages-pane">Messages<span className="info">132</span></a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="misc-nav">
                        <ul>
                            <li className="disabled">
                                <a href="/settings" id="settings-pane">Settings</a>
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
        }
    });

    return Navigation;
});
