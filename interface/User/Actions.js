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

export function login(data) {
    return {
        type: types.USER_LOGIN,
        user: data,
    };
}

export function logout() {
    return {
        type: types.USER_LOGOUT,
    };
}
