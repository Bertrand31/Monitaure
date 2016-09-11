import * as types from './Constants';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        // TODO: Fusionner USER_INFO_POPULATE & USER_HYDRATE ?
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
