import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import popinsReducer from '../Popins/Reducer';
import serviceWorkerReducer from '../ServiceWorker/Reducer';
import menuReducer from '../Menu/Reducer';
import userReducer from '../User/Reducer';
import checksReducer from '../Dashboard/MainPanel/ChecksTable/Reducer';
import openCheckReducer from '../Dashboard/MainPanel/CheckStats/Reducer';

export default combineReducers({
    popins: popinsReducer,
    user: userReducer,
    checks: checksReducer,
    openCheckID: openCheckReducer,
    menuIsOpen: menuReducer,
    isOffline: serviceWorkerReducer,
    routing: routerReducer,
});
