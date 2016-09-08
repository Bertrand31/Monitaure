import React from 'react';

const Navigation = ({ logout }) => (
    <div className="sidebar__nav--wrapper">
        <nav className="main-nav">
            <ul>
                <li className="active">
                    <a href="#_" id="dashboard-pane">Dashboard</a>
                </li>
                <li className="disabled">
                    <a href="#_">
                        Reports<span className="info">14</span>
                    </a>
                </li>
                <li className="disabled">
                    <a href="#_">
                        Messages<span className="info">132</span>
                    </a>
                </li>
            </ul>
        </nav>
        <nav className="misc-nav">
            <ul>
                <li className="disabled">
                    <a href="#_" id="settings-pane">
                        Settings
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Bertrand31/Monitaure/issues" target="_blank" rel="noopener noreferrer">
                        Help
                    </a>
                </li>
            </ul>
        </nav>
        <nav className="auth-nav">
            <ul>
                <li>
                    <a
                        href="/logout"
                        onClick={e => { e.preventDefault(); logout() }}
                    >
                        Log out
                    </a>
                </li>
            </ul>
        </nav>
    </div>
);

export default Navigation;
