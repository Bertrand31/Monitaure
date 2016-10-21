import * as types from './Constants';

const serviceWorkerReducer = (state = false, action) => {
    switch (action.type) {
        case types.UPDATE_APP_STATE: {
            return action.isOffline;
        }

        default:
            return state;
    }
};

export default serviceWorkerReducer;
