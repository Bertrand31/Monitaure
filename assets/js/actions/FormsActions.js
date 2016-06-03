define(['../dispatcher/AppDispatcher', '../constants/FormsConstants'],
    function(AppDispatcher, FormsConstants) {

        const FormsActions = {

            setForm: function(formType) {
                AppDispatcher.dispatch({
                    actionType: FormsConstants.FORM_SET,
                    formType
                });
            },
            unsetForm: function() {
                AppDispatcher.dispatch({
                    actionType: FormsConstants.FORM_UNSET
                });
            }

        };

        return FormsActions;
    }
);
