import * as types from './Constants';

export const reportsFiltersReducer = (state = { checkId: null }, action) => {
    switch (action.type) {
        case types.UPDATE_FILTER:
            return {
                ...state,
                [action.filterName]: action.filterValue,
            };

        default:
            return state;
    }
};

export default reportsFiltersReducer;
