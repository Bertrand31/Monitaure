import * as types from './Constants';

export function open(popoverType) {
    return {
        type: types.POPOVER_OPEN,
        popoverType,
    };
}

export function close() {
    return {
        type: types.POPOVER_CLOSE,
    };
}
