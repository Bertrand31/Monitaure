define(['../dispatcher/AppDispatcher', '../constants/UserConstants', '../serverIO/ajaxMethods', '../serverIO/dataHandling', '../actions/PopinsActions'],
    function(AppDispatcher, UserConstants, ajaxMethods, dataHandling, PopinsActions) {

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

        return UserActions;
    }
);
