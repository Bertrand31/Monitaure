import React from 'react';
import UserInfoStore from '../../stores/UserInfoStore';

class UserInfoView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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

function getUserInfo() {
    return {
        user: UserInfoStore.getUserInfo()
    };
}
class UserInfoController extends React.Component {
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
        if (Object.keys(this.state.user).length < 1) {
            return null;
        }

        return (<UserInfoView user={this.state.user} />);
    }

    _onChange() {
        this.setState(getUserInfo());
    }
}

export default UserInfoController;
