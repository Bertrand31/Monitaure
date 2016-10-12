import * as types from './Constants';

const checkReducer = (state, action) => {
    switch (action.type) {
        case types.CREATE_WORKING_CHECK:
            return {
                tmpID: {
                    id: 'tmpID',
                    name: '',
                    domainNameOrIP: '',
                    port: 80,
                    history: [],
                    emailNotifications: false,
                    isEditing: true,
                },
            };

        case types.SET_WORKING_CHECK:
            return {
                [action.id]: {
                    oldState: {
                        ...state[action.id],
                    },
                    ...state[action.id],
                    isEditing: true,
                },
            };

        case types.UNSET_WORKING_CHECK:
            return {
                [action.id]: {
                    ...state[action.id].oldState,
                    isEditing: false,
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
        case types.CHECKS_HYDRATE: {
            // We loop over the new data and, if the check is being edited, we keep
            // the old version of the properties the user might be changing
            const newState = { ...action.checks };
            Object.keys(newState).forEach((checkId) => {
                if (typeof state[checkId] !== 'undefined' && state[checkId].isEditing) {
                    newState[checkId] = {
                        name: state[checkId].name,
                        emailNotifications: state[checkId].emailNotifications,
                    };
                }
            });
            return newState;
        }

        case types.CHECK_DESTROY: {
            const copy = Object.assign({}, state);
            delete copy[action.id];
            return copy;
        }

        case types.CREATE_WORKING_CHECK:
        case types.SET_WORKING_CHECK:
        case types.UNSET_WORKING_CHECK:
        case types.UPDATE_WORKING_CHECK:
        case types.SAVE_WORKING_CHECK:
            return {
                ...state,
                ...checkReducer(state, action),
            };

        default:
            return state;
    }
};

export default checksReducer;
