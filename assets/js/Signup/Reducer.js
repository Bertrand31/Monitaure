import * as types from './Constants';

const signupFormReducer = (state = {}, action) => {
    switch(action.type) {
        case types.USER_UPDATE:
            return {
                ...state,
                [action.attrName]: action.attrValue
            };

        case types.USER_SIGNUP:
            return {
                ...action.user
            };

        default:
            return state;
    }
};

export default signupFormReducer;
