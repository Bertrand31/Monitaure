import ChecksConstants from './Constants';
import * as userInfoTypes from '../Sidebar/UserInfo/Constants';
import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
import PopinsActions from '../Popins/Actions';

export function populateAll() {
    dataHandling.getUserAndGlobalStats(ajaxMethods.GETer, function(err, data) {
        if (err) return PopinsActions.create('alert', err.message);

        return {
            type: ChecksConstants.CHECK_POPULATE_ALL,
            allChecks: data.userData.checks,
            globalStats: data.globalStats
        };
        //TODO
        // AppDispatcher.dispatch({
        //     actionType: userInfoTypes.USER_INFO_POPULATE,
        //     user: data.userData
        // });
    });
};

export function destroy(id) {
    if (id !== 'tmpID') {
        dataHandling.destroyCheck(ajaxMethods.GETer, id, function(err) {
            if (err) return PopinsActions.create('alert', err.message);
        });
    }
    return {
        type: ChecksConstants.CHECK_DESTROY,
        id
    };
};

export function openStats(id) {
    if (id !== 'tmpID') {
        dataHandling.getCheckStats(ajaxMethods.GETer, id, function(err, data) {
            if (err) return PopinsActions.create('alert', err.message);

            return {
                type: ChecksConstants.OPEN_CHECK_STATS,
                data
            };
        });
    }
};
export function closeStats() {
    return {
        type: ChecksConstants.CLOSE_CHECK_STATS
    };
};

export function createWorkingCheck() {
    return {
        type: ChecksConstants.CREATE_WORKING_CHECK
    };
};

export function setWorkingCheck(id) {
    return {
        type: ChecksConstants.SET_WORKING_CHECK,
        id
    };
};

export function updateWorkingCheck(id, attrName, attrValue) {
    return {
        type: ChecksConstants.UPDATE_WORKING_CHECK,
        id,
        attrName,
        attrValue
    };
};

export function saveWorkingCheck(data) {
    if (data.id === 'tmpID') {
        dataHandling.createCheck(ajaxMethods.POSTer, data, function(err, newData) {
            if (err) return PopinsActions.create('alert', err.message);

            // TODO
            // AppDispatcher.dispatch({
            //     actionType: ChecksConstants.CHECK_DESTROY,
            //     id: 'tmpID'
            // });
            return {
                type: ChecksConstants.CHECK_CREATE,
                data: newData
            };
        });
    } else {
        dataHandling.updateCheck(ajaxMethods.POSTer, data, function(err) {
            if (err) return PopinsActions.create('alert', err.message);
        });
        return {
            type: ChecksConstants.SAVE_WORKING_CHECK,
            id: data.id
        };
    }
};
