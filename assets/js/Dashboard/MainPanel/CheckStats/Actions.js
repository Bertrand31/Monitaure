import * as checksTypes from './Constants';

export function openStats(id) {
    return {
        type: checksTypes.OPEN_CHECK_STATS,
        id,
    };
}

export function closeStats() {
    return {
        type: checksTypes.CLOSE_CHECK_STATS,
    };
}
