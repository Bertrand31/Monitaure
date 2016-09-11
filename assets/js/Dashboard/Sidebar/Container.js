import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Sidebar from './Component';

import { POSTer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';
import { create as popinCreate } from '../../Popins/Actions';
import * as UserActions from '../../User/Actions';


const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
    logout() {
        browserHistory.push('/');
        dispatch(UserActions.changeAuthenticationState(false));

        return API.logout(POSTer, (err) => {
            if (err) return dispatch(popinCreate('alert', err.message));
        });
    },
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;

