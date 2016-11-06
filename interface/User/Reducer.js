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

        case types.USER_HYDRATE:
            return {
                ...action.user,
            };
        case types.USER_LOGOUT:
            return {
                isLoggedIn: false,
            };

        case types.USER_DECREMENT_UNSEEN_REPORTS_COUNT:
            return {
                ...state,
                unseenReports: state.unseenReports - 1,
            };

        default:
            return state;
    }
};

export default userReducer;
