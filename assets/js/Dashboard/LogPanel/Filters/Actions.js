import * as types from './Constants';

export function updateFilter(filterName, filterValue) {
    return {
        type: types.UPDATE_FILTER,
        filterName,
        filterValue,
    };
}

export function hideType(typeToHide) {
    return {
        type: types.ADD_HIDDEN_TYPE,
        typeToHide,
    };
}

export function showType(typeToShow) {
    return {
        type: types.REMOVE_HIDDEN_TYPE,
        typeToShow,
    };
}
