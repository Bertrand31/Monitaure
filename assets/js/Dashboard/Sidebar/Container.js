import { connect } from 'react-redux';

import Sidebar from './Component';

import { POSTer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';
import { create as popinCreate } from '../../Popins/Actions';
import * as UserActions from '../../User/Actions';


const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
    logout() {
        API.logout(POSTer, (err, res) => {
            if (err) return dispatch(popinCreate('alert', err.message));

            dispatch(popinCreate('info', res.message));

            dispatch(UserActions.logout());
        });
    },
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;

