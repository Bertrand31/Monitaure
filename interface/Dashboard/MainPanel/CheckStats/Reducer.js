import * as types from './Constants';

const openCheckReducer = (state = null, action) => {
    switch (action.type) {
        case types.OPEN_CHECK_STATS:
            return action.id;

        case types.CLOSE_CHECK_STATS:
            return null;

        default:
            return state;
    }
};

export default openCheckReducer;
