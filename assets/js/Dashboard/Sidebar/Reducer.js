import * as types from './Constants';

const menuReducer = (state = false, action) => {
    switch (action.type) {
        case types.MENU_TOGGLE:
            return !state;

        case types.MENU_CLOSE:
            return false;

        default:
            return state;
    }
};

export default menuReducer;
