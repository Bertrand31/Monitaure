import React from 'react';

const onNavigation = (e) => {
    e.preventDefault();
    return;
};

const Navigation = () => (
    <div className="sidebar__nav--wrapper">
        <nav className="main-nav">
            <ul>
                <li className="active">
                    <a onClick={onNavigation} href="/" id="dashboard-pane">Dashboard</a>
                </li>
                <li className="disabled">
                    <a onClick={onNavigation} href="/reports" id="reports-pane">
                        Reports<span className="info">14</span>
                    </a>
                </li>
                <li className="disabled">
                    <a onClick={onNavigation} href="/messages" id="messages-pane">
                        Messages<span className="info">132</span>
                    </a>
                </li>
            </ul>
        </nav>
        <nav className="misc-nav">
            <ul>
                <li className="disabled">
                    <a onClick={onNavigation} href="/settings" id="settings-pane">
                        Settings
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Bertrand31/Monitaure/issues" target="_blank" rel="noopener">
                        Help
                    </a>
                </li>
            </ul>
        </nav>
        <nav className="auth-nav">
            <ul>
                <li>
                    <a href="/logout">
                        Log out
                    </a>
                </li>
            </ul>
        </nav>
    </div>
);

export default Navigation;
