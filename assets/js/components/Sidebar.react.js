define(['react', './Sidebar/Navigation.react', './Sidebar/UserInfo.react', '../stores/UserInfoStore'], function(React, Navigation, UserInfo, UserInfoStore) {

    function getUserInfo() {
        return {
            user: UserInfoStore.getUserInfo()
        };
    }

    class Sidebar extends React.Component {
        constructor() {
            super();
            this.state = getUserInfo();
        }
        componentDidMount() {
            UserInfoStore.addChangeListener(this._onChange.bind(this));
        }
        componentWillUnmount() {
            UserInfoStore.removeChangeListener(this._onChange.bind(this));
        }

        render() {
            return (
                <div className="sidebar">
                    <div className="sidebar-top">
                        <h1 id="logo"><img src="/images/logo.svg" alt="Monitaure - Monitoring for the masses" /></h1>
                        <Navigation />
                    </div>
                    <div className="sidebar-bottom" id="profile">
                        <UserInfo user={this.state.user} />
                    </div>
                </div>
            );
        }

        _onChange() {
            this.setState(getUserInfo());
        }
    }

    return Sidebar;
});
