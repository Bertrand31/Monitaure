import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Sidebar from './Component';

import { POSTer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';
import { create as popinCreate } from '../../Popins/Actions';
import * as UserActions from '../../User/Actions';
import * as MenuActions from './Actions';


const mapStateToProps = (state) => ({
    menuIsOpen: state.menuIsOpen,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    toggleMenu() {
        return dispatch(MenuActions.toggle());
    },
    logout() {
        return API.logout(POSTer, (err) => {
            if (err) return dispatch(popinCreate('alert', err.message));

            browserHistory.push('/');
            dispatch(MenuActions.close());
            dispatch(UserActions.changeAuthenticationState(false));
        });
    },
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;

