import * as types from './Constants';

export default function popinsReducer(state = {}, action) {
    switch(action.type) {
        case PopinsConstants.POPIN.CREATE:
            const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
            return {
                [id]: {
                    id: id,
                    variant: action.variant,
                    text: action.text
                },
                ...state
            };

        case PopinsConstants.POPIN_DESTROY:
            const { [action.id]: null, ...rest } = state;
            return rest;

        default:
            return state;
    }
};
