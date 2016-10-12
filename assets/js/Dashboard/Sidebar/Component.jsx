import React, { Component, PropTypes } from 'react';

import Navigation from './Components/Navigation';
import UserInfo from './Components/UserInfo';

class Sidebar extends Component {
    componentDidMount() {
        this.props.hydrateUser();
    }
    render() {
        return (
            <aside className={`l-sidebar ${this.props.menuIsOpen ? 's-menu-is-open' : ''}`}>
                <div className="sidebar-top">
                    <div className="c-mobile-topbar">

                        <button
                            onClick={this.props.toggleMenu}
                            className={`hamburger hamburger--arrow ${this.props.menuIsOpen ? 'is-active' : ''}`}
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
                    <Navigation menuIsOpen={this.props.menuIsOpen} toggleMenu={this.props.toggleMenu} logout={this.props.logout} />
                </div>
                <div className="sidebar-bottom" id="profile">
                    <UserInfo username={this.props.user.username} emailHash={this.props.user.emailHash} />
                </div>
            </aside>
        );
    }
}

Sidebar.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default Sidebar;
