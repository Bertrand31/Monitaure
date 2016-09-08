import * as types from './Constants';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_INFO_POPULATE:
            return {
                userName: action.userData.userName,
                userEmailMD5: action.userData.userEmailMD5,
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
            };

        default:
            return state;
    }
};

export default userReducer;
