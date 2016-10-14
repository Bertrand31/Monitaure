import * as types from './Constants';

export const logFiltersReducer = (state = { checkId: null }, action) => {
    switch (action.type) {
        case types.UPDATE_FILTER: {
            return {
                ...state,
                [action.filterType]: action.filterValue,
            };
        }

        default:
            return state;
    }
};

export default logFiltersReducer;
