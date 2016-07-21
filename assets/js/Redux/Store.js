import { createStore } from 'redux';
import rootReducer from './RootReducer';

export default function ReduxStore(preloadedState) {
    const store = createStore(rootReducer, preloadedState);

    return store;
}
