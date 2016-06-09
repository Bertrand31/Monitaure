define(['react', '../stores/UserInfoStore'], function(React, UserInfoStore) {

    function getUserInfo() {
        return {
            user: UserInfoStore.getUserInfo()
        };
    }

    const User = React.createClass({
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
            if (Object.keys(this.state.user).length < 1) {
                return null;
            }

            const gravatarURL = `https://gravatar.com/avatar/${this.state.user.userEmailMD5}?size=100`;

            return (
                <div className="profile">
                    <a href="http://gravatar.com" target="_blank" title="Set or change your profile picture">
                        <img src={gravatarURL} alt="Profile picture" />
                    </a>
                    <span>{this.state.user.userName}</span>
                </div>
            );
        },

        _onChange() {
            this.setState(getUserInfo());
        }
    });

    return User;
});
