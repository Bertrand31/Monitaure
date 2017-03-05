import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import NavigationComponent from './Component';

import { POSTer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';
import { logout } from '../../../User/Actions';

const mapStateToProps = state => ({
    user: state.user,
    currentRoute: state.routing.locationBeforeTransitions.pathname,
});

const mapDispatchToProps = dispatch => ({
    logout: () => {
        browserHistory.push('/');
        API.logout(POSTer, () => dispatch(logout()));
    },
});

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationComponent);

export default NavigationContainer;
