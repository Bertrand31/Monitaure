import * as types from './Constants';

export function updateFilter(filterName, filterValue) {
    return {
        type: types.UPDATE_FILTER,
        filterName,
        filterValue,
    };
}
