import * as types from './Constants';

export const logReducer = (state = [], action) => {
    switch (action.type) {
        case types.LOG_HYDRATE: {
            return [
                ...action.log,
            ];
        }

        default:
            return state;
    }
};

export default logReducer;
