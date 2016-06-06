define(['../dispatcher/AppDispatcher', '../constants/ChecksConstants', '../serverIO/ajaxMethods', '../serverIO/dataHandling', '../actions/PopinsActions'],
    function(AppDispatcher, ChecksConstants, ajaxMethods, dataHandling, PopinsActions) {

        const ChecksActions = {

            populateAll: function() {
                dataHandling.getAllStats(ajaxMethods.GETer, function(err, data) {
                    if (err) return PopinsActions.create('alert', err.reponseText);
                    // TODO: améliorer la route pour ne retourner que les checks
                    AppDispatcher.dispatch({
                        actionType: ChecksConstants.CHECK_POPULATE_ALL,
                        allChecks: data.userData.checks
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

            destroy: function(id) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.CHECK_DESTROY,
                    id: data.id
                });
                dataHandling.destroyCheck(ajaxMethods.POSTer, id, function(err) {
                    if (err) return PopinsActions.create('alert', err.reponseText);
                });
            },

            setWorkingCheck: function(id) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.SET_WORKING_CHECK,
                    id: id
                });
            },

            updateWorkingCheck: function(id, attrName, attrValue) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.UPDATE_WORKING_CHECK,
                    id: id,
                    attrName,
                    attrValue
                });
            },

            saveWorkingCheck: function(data) {
                AppDispatcher.dispatch({
                    actionType: ChecksConstants.SAVE_WORKING_CHECK,
                    id: data.id
                });
                dataHandling.updateCheck(ajaxMethods.POSTer, data, function(err, data) {
                    if (err) return PopinsActions.create('alert', err.reponseText);
                });
            }
        };

        return ChecksActions;
    }
);
