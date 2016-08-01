import * as types from './Constants';

export function create(variant, text = 'An error occured') {
    return {
        type: types.POPIN_CREATE,
        variant,
        text,
    };
}

export function destroy(id) {
    return {
        type: types.POPIN_DESTROY,
        id,
    };
}
