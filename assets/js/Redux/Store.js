import throttle from 'lodash/throttle';

import { createStore } from 'redux';
import rootReducer from './RootReducer';
import { loadState, saveState } from './LocalStorage';

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, window.devToolsExtension && window.devToolsExtension());

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

export default store;
