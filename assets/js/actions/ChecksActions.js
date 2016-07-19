import AppDispatcher from '../dispatcher/AppDispatcher';
import ChecksConstants from '../constants/ChecksConstants';
import UserInfoConstants from '../constants/UserInfoConstants';
import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
import PopinsActions from '../actions/PopinsActions';

const ChecksActions = {

    populateAll() {
        dataHandling.getUserAndGlobalStats(ajaxMethods.GETer, function(err, data) {
            if (err) return PopinsActions.create('alert', err.message);

            AppDispatcher.dispatch({
                actionType: ChecksConstants.CHECK_POPULATE_ALL,
                allChecks: data.userData.checks,
                globalStats: data.globalStats
            });
            AppDispatcher.dispatch({
                actionType: UserInfoConstants.USER_INFO_POPULATE,
                user: data.userData
            });
        });
    },

    destroy(id) {
        AppDispatcher.dispatch({
            actionType: ChecksConstants.CHECK_DESTROY,
            id
        });
        if (id !== 'tmpID') {
            dataHandling.destroyCheck(ajaxMethods.GETer, id, function(err) {
                if (err) return PopinsActions.create('alert', err.message);
            });
        }
    },

    openStats(id) {
        if (id !== 'tmpID') {
            dataHandling.getCheckStats(ajaxMethods.GETer, id, function(err, data) {
                if (err) return PopinsActions.create('alert', err.message);

                AppDispatcher.dispatch({
                    actionType: ChecksConstants.OPEN_CHECK_STATS,
                    data
                });
            });
        }
    },
    closeStats() {
        AppDispatcher.dispatch({
            actionType: ChecksConstants.CLOSE_CHECK_STATS
        });
    },

    createWorkingCheck() {
        AppDispatcher.dispatch({
            actionType: ChecksConstants.CREATE_WORKING_CHECK
        });
    },

    setWorkingCheck(id) {
        AppDispatcher.dispatch({
            actionType: ChecksConstants.SET_WORKING_CHECK,
            id
        });
    },

    updateWorkingCheck(id, attrName, attrValue) {
        AppDispatcher.dispatch({
            actionType: ChecksConstants.UPDATE_WORKING_CHECK,
            id,
            attrName,
            attrValue
        });
    },

    saveWorkingCheck(data) {
        if (data.id === 'tmpID') {
            dataHandling.createCheck(ajaxMethods.POSTer, data, function(err, newData) {
                if (err) return PopinsActions.create('alert', err.message);

                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_DESTROY,
                    id: 'tmpID'
                });
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_CREATE,
                    data: newData
                });
            });
        } else {
            AppDispatcher.dispatch({
                actionType: ChecksConstants.SAVE_WORKING_CHECK,
                id: data.id
            });
            dataHandling.updateCheck(ajaxMethods.POSTer, data, function(err) {
                if (err) return PopinsActions.create('alert', err.message);
            });
        }
    }
};

export default ChecksActions;
