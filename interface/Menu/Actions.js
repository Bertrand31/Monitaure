import * as types from './Constants';

export function toggle() {
    return {
        type: types.MENU_TOGGLE,
    };
}

export function open() {
    return {
        type: types.MENU_OPEN,
    };
}

export function close() {
    return {
        type: types.MENU_CLOSE,
    };
}
