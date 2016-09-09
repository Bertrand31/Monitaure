import * as types from './Constants';

const userReducer = (state = { isLoggedIn: window.isLoggedIn }, action) => {
    switch (action.type) {
        case types.USER_INFO_POPULATE:
            return {
                ...state,
                username: action.userData.username,
                emailHash: action.userData.emailHash,
            };

        case types.USER_UPDATE:
            return {
                ...state,
                [action.attrName]: action.attrValue,
            };

        case types.USER_SIGNUP:
            return {
                ...action.user,
            };

        case types.USER_LOGIN:
            return {
                ...action.user,
                isLoggedIn: true,
            };

        case types.USER_LOGOUT:
            return {
                isLoggedIn: false,
            };

        default:
            return state;
    }
};

export default userReducer;
