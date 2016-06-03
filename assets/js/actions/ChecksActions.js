define(['../dispatcher/AppDispatcher', '../constants/ChecksConstants'],
    function(AppDispatcher, ChecksConstants) {

        const ChecksActions = {

            populateAll: function() {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_POPULATE_ALL
                });
            },

            create: function(id, name, domainNameOrIP, port, emailNotifications) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_CREATE,
                    id,
                    name,
                    domainNameOrIP,
                    port,
                    emailNotifications
                });
            },

            update: function(id, name, emailNotifications) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_UPDATE,
                    id,
                    name,
                    emailNotifications
                });
            },

            destroy: function(id) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_DESTROY,
                    id: data.id
                });
            },

            setWorkingCheck: function(id) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.SET_WORKING_CHECK,
                    id: id
                });
            },

            updateWorkingCheck: function(attrName, attrValue) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.UPDATE_WORKING_CHECK,
                    attrName,
                    attrValue
                });
            },

            saveWorkingCheck: function() {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.SAVE_WORKING_CHECK,
                });
            }
        };

        return ChecksActions;
    }
);
