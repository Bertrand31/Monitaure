import * as types from './Constants';

const userReducer = (state = { isLoggedIn: false }, action) => {
    switch (action.type) {
        case types.USER_UPDATE:
            return {
                ...state,
                [action.attrName]: action.attrValue,
            };

        case types.USER_EMAIL_SENT:
            return {
                ...state,
                emailSent: true,
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
