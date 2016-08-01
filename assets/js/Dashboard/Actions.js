import * as checksTypes from './Constants';

export function populateChecks(checks) {
    return {
        type: checksTypes.CHECKS_POPULATE,
        checks,
    };
}
export function populateGlobalStats(globalStats) {
    return {
        type: checksTypes.GLOBAL_STATS_POPULATE,
        globalStats,
    };
}

export function destroyCheck(id) {
    return {
        type: checksTypes.CHECK_DESTROY,
        id,
    };
}

export function createWorkingCheck() {
    return {
        type: checksTypes.CREATE_WORKING_CHECK,
    };
}

export function setWorkingCheck(id) {
    return {
        type: checksTypes.SET_WORKING_CHECK,
        id,
    };
}

export function updateWorkingCheck(id, attrName, attrValue) {
    return {
        type: checksTypes.UPDATE_WORKING_CHECK,
        id,
        attrName,
        attrValue,
    };
}

export function saveWorkingCheck(data) {
    return {
        type: checksTypes.SAVE_WORKING_CHECK,
        data,
    };
}

export function openStats(data) {
    return {
        type: checksTypes.OPEN_CHECK_STATS,
        data,
    };
}

export function closeStats() {
    return {
        type: checksTypes.CLOSE_CHECK_STATS,
    };
}
