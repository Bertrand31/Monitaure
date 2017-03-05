import { connect } from 'react-redux';

import UserInfoComponent from './Component';

const mapStateToProps = state => ({
    username: state.user.username,
    emailHash: state.user.emailHash,
});

const UserInfoContainer = connect(mapStateToProps)(UserInfoComponent);

export default UserInfoContainer;
