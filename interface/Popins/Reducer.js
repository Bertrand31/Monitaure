import * as types from './Constants';

const popinReducer = (state, action) => {
    switch (action.type) {
        case types.POPIN_CREATE: {
            return {
                [action.id]: {
                    id: action.id,
                    variant: action.variant,
                    text: action.text,
                },
            };
        }

        default:
            return state;
    }
};

const popinsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.POPIN_CREATE: {
            return {
                ...popinReducer(undefined, action),
                ...state,
            };
        }

        case types.POPIN_DESTROY: {
            const copy = Object.assign({}, state);
            delete copy[action.id];
            return copy;
        }

        default:
            return state;
    }
};

export default popinsReducer;
