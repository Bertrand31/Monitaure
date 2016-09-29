import * as checksTypes from './Constants';

export function openStats(data) {
    return {
        type: checksTypes.OPEN_CHECK_STATS,
        data,
    };
}

export function closeStats() {
    return {
        type: checksTypes.CLOSE_CHECK_STATS,
    };
}
