import * as types from './Constants';

export function updateFilter(filterType, filterValue) {
    return {
        type: types.UPDATE_FILTER,
        filterType,
        filterValue,
    };
}
