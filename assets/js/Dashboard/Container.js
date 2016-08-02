import { connect } from 'react-redux';

import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
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
        dataHandling.getUserAndGlobalStats(ajaxMethods.GETer, (err, data) => {
            if (err) return dispatch(create('alert', err.message));

            dispatch(actions.populateChecks(data.userData.checks));

            dispatch(actions.populateGlobalStats(data.globalStats));

            dispatch(UserActions.populateUserInfo(data.userData));
        });
    },

    destroy(id) {
        dispatch(actions.destroyCheck(id));
        if (id !== 'tmpID') {
            dataHandling.destroyCheck(ajaxMethods.GETer, id, (err) => {
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
            dataHandling.createCheck(ajaxMethods.POSTer, data, (err, newData) => {
                if (err) return dispatch(create('alert', err.message));

                dispatch(actions.destroyCheck('tmpID'));

                dispatch(actions.saveWorkingCheck(newData));
            });
        } else {
            dispatch(actions.saveWorkingCheck(data));

            dataHandling.updateCheck(ajaxMethods.POSTer, data, (err) => {
                if (err) return dispatch(create('alert', err.message));
            });
        }
    },

    openCheckStats(id) {
        if (id !== 'tmpID') {
            dispatch(actions.fetchStats());
            dataHandling.getCheckStats(ajaxMethods.GETer, id, (err, data) => {
                if (err) return dispatch(create('alert', err.message));

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
