define(['react', './Navigation.react', './UserInfo.react', '../stores/UserInfoStore'], function(React, Navigation, UserInfo, UserInfoStore) {

    function getUserInfo() {
        return {
            user: UserInfoStore.getUserInfo()
        };
    }

    const Sidebar = React.createClass({
        getInitialState() {
            return getUserInfo();
        },
        componentDidMount() {
            UserInfoStore.addChangeListener(this._onChange);
        },
        componentWillUnmount() {
            UserInfoStore.removeChangeListener(this._onChange);
        },

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
        },

        _onChange() {
            this.setState(getUserInfo());
        }
    });

    return Sidebar;
});
