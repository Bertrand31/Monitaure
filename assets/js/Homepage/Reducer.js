import * as types from './Constants';

const popoverReducer = (state = { openPopover: null }, action) => {
    switch (action.type) {
        case types.POPOVER_OPEN:
            return {
                isOpen: action.variant,
            };

        case types.POPOVER_CLOSE:
            return {
                isOpen: null,
            };

        default:
            return state;
    }
};

export default popoverReducer;
