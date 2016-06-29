import React from 'react';
import Navigation from './Sidebar/Navigation.react';
import UserInfo from './Sidebar/UserInfo.react';

class Sidebar extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-top">
                    <h1 id="logo"><img src="/images/logo.svg" alt="Monitaure - Monitoring for the masses" /></h1>
                    <Navigation />
                </div>
                <div className="sidebar-bottom" id="profile">
                    <UserInfo />
                </div>
            </div>
        );
    }

}

export default Sidebar;
