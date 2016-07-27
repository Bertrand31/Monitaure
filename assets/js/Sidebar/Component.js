import React from 'react';

import Navigation from '../Navigation/Component';
import UserInfo from '../User/UserInfo/Component';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-top">
                    <h1 id="logo"><img src="/images/logo.svg" alt="Monitaure - Monitoring for the masses" /></h1>
                    <Navigation />
                </div>
                <div className="sidebar-bottom" id="profile">
                    <UserInfo user={this.props.user} />
                </div>
            </div>
        );
    }

}

export default Sidebar;
