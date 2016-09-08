import * as types from './Constants';

export function populateUserInfo(userData) {
    // HEAP `identify` API
    heap.identify(userData.userName);
    return {
        type: types.USER_INFO_POPULATE,
        userData,
    };
}

export function update(attrName, attrValue) {
    return {
        type: types.USER_UPDATE,
        attrName,
        attrValue,
    };
}

export function signup(data) {
    return {
        type: types.USER_SIGNUP,
        user: data,
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
