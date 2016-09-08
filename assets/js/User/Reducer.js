import * as types from './Constants';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        // TODO: enlever d'ici et de l'API
        case types.USER_INFO_POPULATE:
            return {
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
                loggedIn: true,
            };

        case types.USER_LOGOUT:
            return {
                loggedIn: false,
            };

        default:
            return state;
    }
};

export default userReducer;
