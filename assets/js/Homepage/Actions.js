import * as types from './Constants';

export function open(variant) {
    return {
        type: types.POPOVER_OPEN,
        variant,
    };
}

export function close() {
    return {
        type: types.POPOVER_CLOSE,
    };
}
