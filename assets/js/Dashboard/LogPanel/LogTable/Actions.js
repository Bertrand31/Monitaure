import * as types from './Constants';

export function hydrateLog(log) {
    return {
        type: types.LOG_HYDRATE,
        log,
    };
}
