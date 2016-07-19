import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
import PopinsActions from '../actions/PopinsActions';

const UserActions = {

    update(AttrName, AttrValue) {
        AppDispatcher.dispatch({
            actionType: UserConstants.USER_UPDATE,
            AttrName,
            AttrValue
        });
    },

    signup(data) {
        dataHandling.createUser(ajaxMethods.POSTer, data, function(err, user) {
            if (err) return PopinsActions.create('alert', err.message);

            AppDispatcher.dispatch({
                actionType: UserConstants.USER_SIGNUP,
                user
            });
        });
    }
};

export default UserActions;
