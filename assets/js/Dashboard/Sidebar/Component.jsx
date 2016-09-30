import React, { PropTypes } from 'react';

import Navigation from './Components/Navigation';
import UserInfo from './Components/UserInfo';

const Sidebar = ({ menuIsOpen, user, toggleMenu, logout }) => (
    <aside className={`l-sidebar ${menuIsOpen ? 's-menu-is-open' : ''}`}>
        <div className="sidebar-top">
            <div className="c-mobile-topbar">

                <button
                    onClick={toggleMenu}
                    className={`hamburger hamburger--arrow ${menuIsOpen ? 'is-active' : ''}`}
                    type="button"
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner" />
                    </span>
                </button>

                <h1 className="c-logo">
                    <img
                        width="165"
                        src="/images/logo.svg"
                        alt="Monitaure - Monitoring for the masses"
                    />
                </h1>
                <div className="c-dummy" />
            </div>
            <Navigation menuIsOpen={menuIsOpen} toggleMenu={toggleMenu} logout={logout} />
        </div>
        <div className="sidebar-bottom" id="profile">
            <UserInfo username={user.username} emailHash={user.emailHash} />
        </div>
    </aside>
);

Sidebar.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default Sidebar;
