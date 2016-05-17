define(['../dispatcher/AppDispatcher', '../constants/ChecksConstants'],
    function(AppDispatcher, ChecksConstants) {

        const ChecksActions = {

            populateAll: function(checks) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_POPULATE_ALL,
                    checks: checks
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
                    id: id
                });
            }
        };

        return ChecksActions;
    }
);
