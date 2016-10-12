import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navigation = ({ currentRoute, menuIsOpen, logout }) => (
    <div className={`sidebar__nav--wrapper ${menuIsOpen ? '' : 's-is-hidden'}`}>
        <nav className="c-nav main-nav">
            <ul>
                <li className={`c-nav__item ${currentRoute.match(/^\/app\/?$/) ? 'active' : ''}`}>
                    <Link className="c-nav__link" to="/app" id="dashboard-pane">Dashboard</Link>
                </li>
                <li className="c-nav__item disabled">
                    <a className="c-nav__link" href="#_">
                        Reports<span className="info">14</span>
                    </a>
                </li>
                <li className={`c-nav__item ${currentRoute.match(/^\/app\/log\/?$/) ? 'active' : ''}`}>
                    <Link className="c-nav__link" to="/app/log">
                        Log<span className="info">132</span>
                    </Link>
                </li>
            </ul>
        </nav>
        <nav className="c-nav misc-nav">
            <ul>
                <li className="c-nav__item disabled">
                    <a className="c-nav__link" href="#_" id="settings-pane">
                        Settings
                    </a>
                </li>
                <li className="c-nav__item ">
                    <a className="c-nav__link" href="https://github.com/Bertrand31/Monitaure/issues" target="_blank" rel="noopener noreferrer">
                        Help
                    </a>
                </li>
            </ul>
        </nav>
        <nav className="c-nav auth-nav">
            <ul>
                <li className="c-nav__item ">
                    <a
                        className="c-nav__link"
                        href="/logout"
                        onClick={(e) => { e.preventDefault(); logout(); }}
                    >
                        Log out
                    </a>
                </li>
            </ul>
        </nav>
    </div>
);

Navigation.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};

export default Navigation;
