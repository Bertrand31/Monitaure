import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Sidebar from './Component';

import { GETer, POSTer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';
import { create as popinCreate } from '../../Popins/Actions';
import * as UserActions from '../../User/Actions';
import * as MenuActions from '../../Menu/Actions';


const mapStateToProps = state => ({
    menuIsOpen: state.menuIsOpen,
    user: state.user,
    currentRoute: state.routing.locationBeforeTransitions.pathname,
});

const mapDispatchToProps = dispatch => ({
    hydrateUser: () => API.getUserData(GETer, (err, user) => {
        if (err) return dispatch(popinCreate('alert', err.message));

        heap.identify(user.username);

        return dispatch(UserActions.login(user));
    }),

    toggleMenu: () => dispatch(MenuActions.toggle()),

    logout: () => API.logout(POSTer, (err) => {
        if (err) return dispatch(popinCreate('alert', err.message));

        browserHistory.push('/');
        dispatch(MenuActions.close());
        dispatch(UserActions.logout());
    }),
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;

