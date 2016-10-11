import * as types from './Constants';

export function create(variant = 'alert', text = 'An error occured') {
    return {
        type: types.POPIN_CREATE,
        id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
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
