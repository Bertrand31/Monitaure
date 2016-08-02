import * as types from './Constants';

const checkReducer = (state, action) => {
    switch (action.type) {
        case types.CREATE_WORKING_CHECK:
            return {
                tmpID: {
                    id: 'tmpID',
                    name: '',
                    domainNameOrIP: '',
                    history: [],
                    emailNotifications: false,
                    isEditing: true,
                },
            };

        case types.SET_WORKING_CHECK:
            return {
                [action.id]: {
                    ...state[action.id],
                    isEditing: true,
                },
            };

        case types.UPDATE_WORKING_CHECK:
            return {
                [action.id]: {
                    ...state[action.id],
                    [action.attrName]: action.attrValue,
                },
            };

        case types.SAVE_WORKING_CHECK:
            return {
                [action.data.id]: {
                    ...action.data,
                    isEditing: false,
                },
            };

        default:
            return state;

    }
};

export const checksReducer = (state = {}, action) => {
    switch (action.type) {
        case types.CHECKS_POPULATE: {
            // We turn an array into an object with checks ids as keys
            const newState = {};
            action.checks.forEach(check => { newState[check.id] = check; });
            return {
                ...newState,
            };
        }

        case types.CHECK_DESTROY: {
            const copy = Object.assign({}, state);
            delete copy[action.id];
            return copy;
        }

        case types.CREATE_WORKING_CHECK:
            return {
                ...state,
                ...checkReducer(state, action),
            };

        case types.SET_WORKING_CHECK:
            return {
                ...state,
                ...checkReducer(state, action),
            };

        case types.UPDATE_WORKING_CHECK:
            return {
                ...state,
                ...checkReducer(state, action),
            };

        case types.SAVE_WORKING_CHECK:
            return {
                ...state,
                ...checkReducer(state, action),
            };

        default:
            return state;
    }
};

export const globalStatsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.GLOBAL_STATS_POPULATE:
            return {
                ...action.globalStats,
            };

        default:
            return state;
    }
};

export const openCheckReducer = (state = {}, action) => {
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
