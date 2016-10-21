import * as checksTypes from './Constants';

export function hydrateChecks(checks) {
    return {
        type: checksTypes.CHECKS_HYDRATE,
        checks,
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

export function unsetWorkingCheck(id) {
    return {
        type: checksTypes.UNSET_WORKING_CHECK,
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
