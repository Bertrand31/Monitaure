import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SidebarComponent from './Component';

import { GETer, POSTer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';
import { login, logout } from '../../User/Actions';
import { toggle as toggleMenu } from '../../Menu/Actions';


const mapStateToProps = state => ({
    menuIsOpen: state.menuIsOpen,
    user: state.user,
    currentRoute: state.routing.locationBeforeTransitions.pathname,
});

const mapDispatchToProps = dispatch => ({
    hydrateUser: () => API.getUserData(GETer, (err, user) => {
        if (typeof heap !== 'undefined') heap.identify(user.username);
        return dispatch(login(user));
    }),

    toggleMenu: () => dispatch(toggleMenu()),

    logout: () => {
        browserHistory.push('/');
        API.logout(POSTer, () => dispatch(logout()));
    },
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent);

export default SidebarContainer;

