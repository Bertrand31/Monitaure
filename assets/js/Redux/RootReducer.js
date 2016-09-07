import { combineReducers } from 'redux';

import popinsReducer from '../Popins/Reducer';
import userReducer from '../User/Reducer';
import { checksReducer, openCheckReducer, globalStatsReducer } from '../Dashboard/Reducer';
import popoverReducer from '../Popover/Reducer';

export default combineReducers({
    popins: popinsReducer,
    user: userReducer,
    checks: checksReducer,
    openCheck: openCheckReducer,
    globalStats: globalStatsReducer,
    openPopover: popoverReducer,
});
