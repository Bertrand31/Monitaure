import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import popinsReducer from '../Popins/Reducer';
import popoverReducer from '../Pages/Popover/Reducer';
import serviceWorkerReducer from '../ServiceWorker/Reducer';
import menuReducer from '../Menu/Reducer';
import userReducer from '../User/Reducer';
import checksReducer from '../Dashboard/MainPanel/ChecksTable/Reducer';
import openCheckReducer from '../Dashboard/MainPanel/CheckStats/Reducer';
import reportsReducer from '../Dashboard/ReportsPanel/ReportsTable/Reducer';
import reportsFiltersReducer from '../Dashboard/ReportsPanel/Filters/Reducer';
import logReducer from '../Dashboard/LogPanel/LogTable/Reducer';
import logFiltersReducer from '../Dashboard/LogPanel/Filters/Reducer';

export default combineReducers({
    popins: popinsReducer,
    openPopover: popoverReducer,
    user: userReducer,
    checks: checksReducer,
    openCheckID: openCheckReducer,
    reports: reportsReducer,
    reportsFilters: reportsFiltersReducer,
    log: logReducer,
    logFilters: logFiltersReducer,
    menuIsOpen: menuReducer,
    isOffline: serviceWorkerReducer,
    routing: routerReducer,
});
