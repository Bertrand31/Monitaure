import React, { Component, PropTypes } from 'react';

import Navigation from './Navigation/Container';
import UserInfo from './UserInfo/Container';

class Sidebar extends Component {
    static propTypes = {
        menuIsOpen: PropTypes.bool.isRequired,
        toggleMenu: PropTypes.func.isRequired,
    }

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
                    <Navigation menuIsOpen={this.props.menuIsOpen} />
                </div>
                <div className="sidebar-bottom" id="profile">
                    <UserInfo />
                </div>
            </aside>
        );
    }
}

export default Sidebar;
