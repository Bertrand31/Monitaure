import * as types from './Constants';

export function setConnectivityState(connectivityState = 'online') {
    return {
        type: types.UPDATE_APP_STATE,
        isOffline: connectivityState === 'offline',
    };
}
