import * as types from './Constants';

export function update(attrName, attrValue) {
    return {
        type: types.USER_UPDATE,
        attrName,
        attrValue,
    };
}

export function emailSent() {
    return {
        type: types.USER_EMAIL_SENT,
    };
}

export function hydrate(data) {
    return {
        type: types.USER_HYDRATE,
        user: data,
    };
}

export function logout() {
    return {
        type: types.USER_LOGOUT,
    };
}

export function decrementUnseenReportsCount() {
    return {
        type: types.USER_DECREMENT_UNSEEN_REPORTS_COUNT,
    };
}
