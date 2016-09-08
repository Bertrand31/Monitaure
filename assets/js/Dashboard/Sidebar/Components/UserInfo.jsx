import React, { PropTypes } from 'react';

const UserInfo = ({ username, emailHash }) => {
    if (typeof emailHash === 'undefined' || typeof username === 'undefined') {
        return null;
    }

    const gravatarURL = `https://gravatar.com/avatar/${emailHash}?size=100`;

    return (
        <div className="profile">
            <a href="http://gravatar.com" target="_blank" rel="noopener noreferrer" title="Set or change your profile picture">
                <img src={gravatarURL} alt="Profile" />
            </a>
            <span>{username}</span>
        </div>
    );
};

UserInfo.propTypes = {
    username: PropTypes.string,
    emailHash: PropTypes.string,
};

export default UserInfo;
