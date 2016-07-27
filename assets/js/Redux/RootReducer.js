import { combineReducers } from 'redux';
import popinsReducer from '../Popins/Reducer';
import signupFormReducer from '../Signup/Reducer';

export default combineReducers({
    popins: popinsReducer,
    user: signupFormReducer
});
