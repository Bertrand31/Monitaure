define(['react'], function(React) {

    class User extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            if (Object.keys(this.props.user).length < 1) {
                return null;
            }

            const gravatarURL = `https://gravatar.com/avatar/${this.props.user.userEmailMD5}?size=100`;

            return (
                <div className="profile">
                    <a href="http://gravatar.com" target="_blank" title="Set or change your profile picture">
                        <img src={gravatarURL} alt="Profile picture" />
                    </a>
                    <span>{this.props.user.userName}</span>
                </div>
            );
        }
    }

    return User;
});
