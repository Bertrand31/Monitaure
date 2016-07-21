import * as types from '../constants/PopinsConstants';

export function create(type, text) {
    return {
        type: actions.POPIN_CREATE,
        variant,
        text
    };
};

export function destroy(id) {
    return {
        type: actions.POPIN_DESTROY,
        id: id
    };
};
