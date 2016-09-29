import { connect } from 'react-redux';

import { POSTer, GETer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';
import { create as popinCreate } from '../../Popins/Actions';

import * as actions from './Actions';
import * as UserActions from '../../User/Actions';
import * as MenuActions from '../Sidebar/Actions';
import MainPanel from './Component';

const mapStateToProps = state => ({
    checks: state.checks,
    globalStats: state.globalStats,
    openCheck: state.openCheck,
    user: state.user,
    menuIsOpen: state.menuIsOpen,
});

const mapDispatchToProps = dispatch => ({
    populateAll() {
        API.getUserAndChecks(GETer, (err, { user, checks }) => {
            if (err) return dispatch(popinCreate('alert', err.message));

            heap.identify(user.userName);

            dispatch(UserActions.hydrate(user));
            dispatch(actions.populateChecks(checks));
        });
    },

    destroy(id) {
        dispatch(actions.destroyCheck(id));
        if (id !== 'tmpID') {
            API.destroyCheck(GETer, id, (err) => {
                if (err) return dispatch(popinCreate('alert', err.message));
            });
        }
    },

    createWorkingCheck() {
        return dispatch(actions.createWorkingCheck());
    },
    setWorkingCheck(id) {
        return dispatch(actions.setWorkingCheck(id));
    },
    unsetWorkingCheck(id) {
        return dispatch(actions.unsetWorkingCheck(id));
    },
    updateWorkingCheck(id, attrName, attrValue) {
        return dispatch(actions.updateWorkingCheck(id, attrName, attrValue));
    },
    saveWorkingCheck(data) {
        if (data.id === 'tmpID') {
            API.createCheck(POSTer, data, (err, newData) => {
                if (err) return dispatch(popinCreate('alert', err.message));

                dispatch(actions.destroyCheck('tmpID'));

                dispatch(actions.saveWorkingCheck(newData));
            });
        } else {
            dispatch(actions.saveWorkingCheck(data));

            API.updateCheck(POSTer, data, (err) => {
                if (err) return dispatch(popinCreate('alert', err.message));
            });
        }
    },

    openCheckStats(check) {
        if (check.id !== 'tmpID') {
            dispatch(actions.openStats(check));
        }
    },
    closeCheckStats() {
        return dispatch(actions.closeStats());
    },
    closeMenu() {
        return dispatch(MenuActions.close());
    },
});

const MainPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPanel);

export default MainPanelContainer;
