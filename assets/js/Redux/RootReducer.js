import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import popinsReducer from '../Popins/Reducer';
import userReducer from '../User/Reducer';
import { checksReducer, openCheckReducer, globalStatsReducer } from '../Dashboard/MainPanel/Reducer';

export default combineReducers({
    popins: popinsReducer,
    user: userReducer,
    checks: checksReducer,
    openCheck: openCheckReducer,
    globalStats: globalStatsReducer,
    routing: routerReducer,
});
