import { connect } from 'react-redux';

import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
import { create } from '../Popins/Actions';

import * as actions from './Actions';
import * as UserActions from '../User/Actions';
import Dashboard from './Component';

const mapStateToProps = (state) => {
    return {
        checks: state.checks,
        globalStats: state.globalStats,
        // openCheck: state.openCheck,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        populateAll() {
            dataHandling.getUserAndGlobalStats(ajaxMethods.GETer, function(err, data) {
                if (err) return dispatch(create('alert', err.message));

                dispatch(actions.populateChecks(data.userData.checks));

                dispatch(actions.populateGlobalStats(data.globalStats));

                dispatch(UserActions.populateUserInfo(data.userData));
            });
        },
        destroy(id) {
            dispatch(actions.destroyCheck(id));
            if (id !== 'tmpID') {
                dataHandling.destroyCheck(ajaxMethods.GETer, id, function(err) {
                    if (err) return PopinsActions.create('alert', err.message);
                });
            }
        },
        createWorkingCheck() {
            dispatch(actions.createWorkingCheck());
        },
        updateWorkingCheck(id, attrName, attrValue) {
            dispatch(actions.updateWorkingCheck(id, attrName, attrValue));
        },
        saveWorkingCheck(data) {
            if (data.id === 'tmpID') {
                dataHandling.createCheck(ajaxMethods.POSTer, data, function(err, newData) {
                    if (err) return dispatch(create('alert', err.message));

                    dispatch(actions.destroyCheck('tmpID'));

                    dispatch(actions.saveWorkingCheck(data));
                });
            } else {
                dispatch(actions.saveWorkingCheck(data));

                dataHandling.updateCheck(ajaxMethods.POSTer, data, function(err) {
                    if (err) return PopinsActions.create('alert', err.message);
                });
            }
        }
    };
};

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
