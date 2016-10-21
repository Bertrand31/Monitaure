import * as types from './Constants';

const popoverReducer = (state = null, action) => {
    switch (action.type) {
        case types.POPOVER_OPEN: {
            return action.popoverType;
        }
        case types.POPOVER_CLOSE: {
            return null;
        }

        default:
            return state;
    }
};

export default popoverReducer;
