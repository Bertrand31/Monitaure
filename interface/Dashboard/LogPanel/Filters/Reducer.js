import * as types from './Constants';

const hiddenTypesReducer = (state, action) => {
    switch (action.type) {
        case types.ADD_HIDDEN_TYPE:
            return [
                ...state,
                action.typeToHide,
            ];
        case types.REMOVE_HIDDEN_TYPE:
            return state.filter(type => type !== action.typeToShow);

        default:
            return state;
    }
};

export const logFiltersReducer = (state = { checkId: null, hiddenTypes: [] }, action) => {
    switch (action.type) {
        case types.UPDATE_FILTER:
            return {
                ...state,
                [action.filterName]: action.filterValue,
            };

        case types.ADD_HIDDEN_TYPE:
        case types.REMOVE_HIDDEN_TYPE:
            return {
                ...state,
                hiddenTypes: hiddenTypesReducer(state.hiddenTypes, action),
            };

        default:
            return state;
    }
};

export default logFiltersReducer;
