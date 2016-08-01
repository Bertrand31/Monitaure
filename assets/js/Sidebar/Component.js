import React, { PropTypes } from 'react';

import Navigation from '../Navigation/Component';
import UserInfo from '../User/UserInfo/Component';

const Sidebar = ({ user }) => (
    <div className="sidebar aside">
        <div className="sidebar-top">
            <h1 id="logo">
                <img src="/images/logo.svg" alt="Monitaure - Monitoring for the masses" />
            </h1>
            <Navigation />
        </div>
        <div className="sidebar-bottom" id="profile">
            <UserInfo user={user} />
        </div>
    </div>
);

Sidebar.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Sidebar;
