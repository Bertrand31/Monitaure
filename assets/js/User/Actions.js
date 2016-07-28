import * as types from './Constants';

export function populateUserInfo(userData) {
    return {
        type: types.USER_INFO_POPULATE,
        userData
    };
};

export function update(attrName, attrValue) {
    return {
        type: types.USER_UPDATE,
        attrName,
        attrValue
    };
};

export function signup(data) {
    return {
        type: types.USER_SIGNUP,
        user: data
    };
};
