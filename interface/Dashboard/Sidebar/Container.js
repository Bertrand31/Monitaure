import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SidebarComponent from './Component';

import { GETer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';
import { login } from '../../User/Actions';
import { toggle as toggleMenu } from '../../Menu/Actions';

const mapStateToProps = state => ({
    menuIsOpen: state.menuIsOpen,
});

const mapDispatchToProps = dispatch => ({
    toggleMenu: () => dispatch(toggleMenu()),

    hydrateUser: () => API.getUserData(GETer, (err, user) => {
        if (typeof heap !== 'undefined') heap.identify(user.username);
        return dispatch(login(user));
    }),
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent);

export default SidebarContainer;

