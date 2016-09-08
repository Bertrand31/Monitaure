import React, { PropTypes } from 'react';

import Navigation from './Components/Navigation';
import UserInfo from './Components/UserInfo';

const Sidebar = ({ user, logout }) => (
    <div className="sidebar aside">
        <div className="sidebar-top">
            <h1 id="logo">
                <img src="/images/logo.svg" alt="Monitaure - Monitoring for the masses" />
            </h1>
            <Navigation logout={logout} />
        </div>
        <div className="sidebar-bottom" id="profile">
            <UserInfo username={user.username} emailHash={user.emailHash} />
        </div>
    </div>
);

Sidebar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default Sidebar;
