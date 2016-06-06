define(['../dispatcher/AppDispatcher', 'events', '../constants/ChecksConstants', 'object-assign'],

    function(AppDispatcher, events, ChecksConstants, assign) {

        const EventEmitter = events.EventEmitter;

        const CHANGE_EVENT = 'change';

        const _checks = {};
        let   _workingCheck = null;

        function populateSingle(id, history, stats) {
            _checks[id].history = history;
            _checks[id].stats = stats;
        }
        function populateAll(allChecks) {
            allChecks.map((check) => {
                _checks[check.id] = check;
            });
            ChecksStore.emitChange();
        }

        function create(id, name, domainNameOrIP, port, emailNotifications) {
            _checks[id] = {
                id,
                name,
                domainNameOrIP,
                port,
                emailNotifications
            };
        }
        function destroy(id) {
            delete _checks[id];
        }

        function setWorkingCheck(id = null) {
            _checks[id].isEditing = true;
        }
        function updateWorkingCheck(id, attrName, attrValue) {
            _checks[id][attrName] = attrValue;
        }
        function saveWorkingCheck(id) {
            delete _checks[id].isEditing;
        }

        const ChecksStore = assign({}, EventEmitter.prototype, {
            getAll: function() {
                return _checks;
            },
            getSingle: function(id) {
                return _checks[id];
            },
            setWorkingCheck: function(id) {
                setWorkingCheck(id);
            },
            getWorkingCheck: function() {
                return _workingCheck;
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

        ChecksStore.dispatchToken = AppDispatcher.register(function(action) {

            const allChecks = action.allChecks;
            const history = action.history;
            const name = action.name,
                  domainNameOrIP = action.domainNameOrIP,
                  port = action.port,
                  emailNotifications = action.emailNotifications,
                  id   = action.id;
            const attrName = action.attrName,
                  attrValue = action.attrValue;

            switch(action.actionType) {
                case ChecksConstants.CHECK_POPULATE_SINGLE:
                    populateSingle(id, history, stats);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_POPULATE_ALL:
                    populateAll(allChecks);
                    break;

                case ChecksConstants.CHECK_CREATE:
                    create(id, name, domainNameOrIP, port, emailNotifications);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_DESTROY:
                    destroy(id);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.SET_WORKING_CHECK:
                    setWorkingCheck(id);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.UPDATE_WORKING_CHECK:
                    updateWorkingCheck(id, attrName, attrValue);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.SAVE_WORKING_CHECK:
                    saveWorkingCheck(id);
                    ChecksStore.emitChange();
                    break;

                default:
            }
        });

        return ChecksStore;
    }
);

