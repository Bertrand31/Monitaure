define(['../dispatcher/AppDispatcher', '../constants/ChecksConstants', '../serverIO/ajaxMethods', '../serverIO/dataHandling'],
    function(AppDispatcher, ChecksConstants, ajaxMethods, dataHandling) {

        const ChecksActions = {

            populateAll: function() {
                dataHandling.getAllStats(ajaxMethods.GETer, function(err, data) {
                    if (err) return PopinsActions.create('alert', err.reponseText);

                    // TODO: améliorer la route pour ne retourner que les checks
                    AppDispatcher.dispatch({
                        actionType: ChecksConstants.CHECK_POPULATE_ALL,
                        checks: data.userData.checks
                    });
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
                dataHandling.destroyCheck(ajaxMethods.POSTer, id, function(err, data) {
                    AppDispatcher.dispatch({
                        actionType: ChecksConstants.CHECK_DESTROY,
                        id: data.id
                    });
                });
            },

            openCheckUpdate: function(id) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.OPEN_CHECK_UPDATE,
                    id: id
                });
            }
        };

        return ChecksActions;
    }
);
