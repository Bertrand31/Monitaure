import React, { Component, PropTypes } from 'react';

import Navigation from './Navigation/Container';
import UserInfo from './UserInfo/Container';

const SidebarComponent = ({ menuIsOpen, toggleMenu }) => (
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
            <Navigation menuIsOpen={menuIsOpen} />
        </div>
        <div className="sidebar-bottom" id="profile">
            <UserInfo />
        </div>
    </aside>
);

SidebarComponent.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default SidebarComponent;
