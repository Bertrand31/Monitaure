define(['../dispatcher/AppDispatcher', '../constants/PopinsConstants'],
    function(AppDispatcher, PopinsConstants) {

        const PopinsActions = {
            create: function(type, text) {
                AppDispatcher.dispatch({
                    actionType: PopinsConstants.POPIN_CREATE,
                    type: type,
                    text: text
                });
            },

            destroy: function(id) {
                AppDispatcher.dispatch({
                    actionType: PopinsConstants.POPIN_DESTROY,
                    id: id
                });
            }
        };

        return PopinsActions;
    }
);
