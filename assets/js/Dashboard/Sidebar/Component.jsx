import React, { PropTypes } from 'react';

import Navigation from './Components/Navigation';
import UserInfo from './Components/UserInfo';

const Sidebar = ({ user, logout }) => (
    <aside className="l-sidebar">
        <div className="sidebar-top">
            <div className="c-mobile-topbar">
            {/*<button className="sidebar__toggle" />*/}
                <h1 id="logo">
                    <img src="/images/logo.svg" alt="Monitaure - Monitoring for the masses" />
                </h1>
            </div>
            <Navigation logout={logout} />
        </div>
        <div className="sidebar-bottom" id="profile">
            <UserInfo username={user.username} emailHash={user.emailHash} />
        </div>
    </aside>
);

Sidebar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default Sidebar;
