define(['../dispatcher/AppDispatcher', 'events', '../constants/FormsConstants', 'object-assign'],

    function(AppDispatcher, events, FormsConstants, assign) {

        const EventEmitter = events.EventEmitter;

        const CHANGE_EVENT = 'change';

        let _currentForm = null;

        function set(formType) {
            _currentForm = formType;
        }
        function unset() {
            _currentForm = null;
        }

        const FormsStore = assign({}, EventEmitter.prototype, {
            getCurrent: function() {
                return _currentForm;
            },
            emitChange: function() {
                this.emit(CHANGE_EVENT);
            },
            addChangeListener: function(callback) {
                this.on(CHANGE_EVENT, callback);
            },
            removeChangeListener: function(callback) {
                this.removeListener(CHANGE_EVENT, callback);
            }
        });

        FormsStore.dispatchToken = AppDispatcher.register(function(action) {

            const formType = action.formType;

            switch(action.actionType) {
                case FormsConstants.FORM_SET:
                    set(formType);
                    FormsStore.emitChange();
                    break;

                case FormsConstants.FORM_UNSET:
                    unset();
                    FormsStore.emitChange();
                    break;

                default:
            }
        });

        return FormsStore;
    }
);


