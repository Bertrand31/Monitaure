import { createStore } from 'redux';
import rootReducer from './RootReducer';

const store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

export default store;
