import { connect } from 'react-redux';

import { POSTer, GETer } from '../serverIO/ajaxMethods';
import * as API from '../serverIO/dataHandling';
import { create } from '../Popins/Actions';

import * as actions from './Actions';
import * as UserActions from '../User/Actions';
import Dashboard from './Component';

const mapStateToProps = (state) => ({
    checks: state.checks,
    globalStats: state.globalStats,
    openCheck: state.openCheck,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    populateAll() {
        API.getUserAndGlobalStats(GETer, (err, data) => {
            if (err) return dispatch(create('alert', err.message));

            dispatch(actions.populateChecks(data.userData.checks));

            dispatch(actions.populateGlobalStats(data.globalStats));

            dispatch(UserActions.populateUserInfo(data.userData));
        });
    },

    destroy(id) {
        dispatch(actions.destroyCheck(id));
        if (id !== 'tmpID') {
            API.destroyCheck(GETer, id, (err) => {
                if (err) return dispatch(create('alert', err.message));
            });
        }
    },

    createWorkingCheck() {
        dispatch(actions.createWorkingCheck());
    },
    setWorkingCheck(id) {
        dispatch(actions.setWorkingCheck(id));
    },
    updateWorkingCheck(id, attrName, attrValue) {
        dispatch(actions.updateWorkingCheck(id, attrName, attrValue));
    },
    saveWorkingCheck(data) {
        if (data.id === 'tmpID') {
            API.createCheck(POSTer, data, (err, newData) => {
                if (err) return dispatch(create('alert', err.message));

                dispatch(actions.destroyCheck('tmpID'));

                dispatch(actions.saveWorkingCheck(newData));
            });
        } else {
            dispatch(actions.saveWorkingCheck(data));

            API.updateCheck(POSTer, data, (err) => {
                if (err) return dispatch(create('alert', err.message));
            });
        }
    },

    openCheckStats(id) {
        if (id !== 'tmpID') {
            dispatch(actions.fetchStats());
            API.getCheckStats(GETer, id, (err, data) => {
                if (err) {
                    dispatch(actions.closeStats());
                    return dispatch(create('alert', 'No data yet!'));
                }

                dispatch(actions.openStats(data));
            });
        }
    },
    closeCheckStats() {
        dispatch(actions.closeStats());
    },
});

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
