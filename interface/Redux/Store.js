import throttle from 'lodash/throttle';

import { createStore } from 'redux';
import rootReducer from './RootReducer';
import { loadState, saveState } from './LocalStorage';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    // window.devToolsExtension && window.devToolsExtension()
);

store.subscribe(throttle(() => {
    saveState({
        user: store.getState().user,
        checks: store.getState().checks,
        globalStats: store.getState().globalStats,
        log: store.getState().log,
        reports: store.getState().reports,
    });
}, 1000));

export default store;
