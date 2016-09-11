import * as types from './Constants';

export function update(attrName, attrValue) {
    return {
        type: types.USER_UPDATE,
        attrName,
        attrValue,
    };
}

export function hydrate(data) {
    return {
        type: types.USER_HYDRATE,
        user: data,
    };
}

export function changeAuthenticationState(isLoggedIn) {
    return {
        type: types.USER_CHANGE_AUTH,
        isLoggedIn,
    };
}
