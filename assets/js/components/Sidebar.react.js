define(['react', './Sidebar/Navigation.react', './Sidebar/UserInfo.react'], function(React, Navigation, UserInfo) {

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

    return Sidebar;
});
