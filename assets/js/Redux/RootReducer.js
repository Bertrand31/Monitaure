import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import popinsReducer from '../Popins/Reducer';
import serviceWorkerReducer from '../ServiceWorker/Reducer';
import menuReducer from '../Dashboard/Sidebar/Reducer';
import userReducer from '../User/Reducer';
import { checksReducer, openCheckReducer } from '../Dashboard/MainPanel/Reducer';

export default combineReducers({
    popins: popinsReducer,
    user: userReducer,
    checks: checksReducer,
    openCheck: openCheckReducer,
    menuIsOpen: menuReducer,
    isOffline: serviceWorkerReducer,
    routing: routerReducer,
});
