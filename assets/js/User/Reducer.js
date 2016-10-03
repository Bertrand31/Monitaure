import * as types from './Constants';

const userReducer = (state = { isLoggedIn: false }, action) => {
    switch (action.type) {
        case types.USER_UPDATE:
            return {
                ...state,
                [action.attrName]: action.attrValue,
            };

        case types.USER_HYDRATE:
            return {
                ...state,
                ...action.user,
            };
        case types.USER_CHANGE_AUTH:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };

        default:
            return state;
    }
};

export default userReducer;
