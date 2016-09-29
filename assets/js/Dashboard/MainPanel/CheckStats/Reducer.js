import * as types from './Constants';

const openCheckReducer = (state = {}, action) => {
    switch (action.type) {
        case types.OPEN_CHECK_STATS:
            return {
                ...action.data,
            };

        case types.CLOSE_CHECK_STATS:
            return {};

        default:
            return state;
    }
};

export default openCheckReducer;
