import React, { PropTypes } from 'react';

const UserInfoComponent = ({ user }) => {
    if (typeof user.userEmailMD5 === 'undefined') {
        return null;
    }

    const gravatarURL = `https://gravatar.com/avatar/${user.userEmailMD5}?size=100`;

    return (
        <div className="profile">
            <a href="http://gravatar.com" target="_blank" rel="noopener" title="Set or change your profile picture">
                <img src={gravatarURL} alt="Profile" />
            </a>
            <span>{user.userName}</span>
        </div>
    );
};

UserInfoComponent.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserInfoComponent;
