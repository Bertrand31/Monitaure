import * as types from './Constants';

export const checksReducer = (state = {}, action) => {
    switch(action.type) {
        case types.CHECKS_POPULATE:
            const newState = {};
            action.checks.map(check => {
                newState[check.id] = check;
            });
            return {
                ...newState
            };

        case types.CHECK_DESTROY:
            const copy = Object.assign({}, state);
            delete copy[action.id];
            return copy;

        default:
            return state;
    }
};

export const globalStatsReducer = (state = {}, action) => {
    switch(action.type) {
        case types.GLOBAL_STATS_POPULATE:
            return {
                ...action.globalStats
            };

        default:
            return state;
    }
};
