define(['../dispatcher/AppDispatcher', 'events', '../constants/ChecksConstants', 'object-assign'],

    function(AppDispatcher, events, ChecksConstants, assign) {

        const EventEmitter = events.EventEmitter;

        const CHANGE_EVENT = 'change';

        const _checks = {};
        let   _updateTarget = {};

        function populateSingle(id, history, stats) {
            _checks[id].history = history;
            _checks[id].stats = stats;
        }

        function populateAll(checks) {
            checks.map((check) => {
                _checks[check.id] = check;
            });
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

        function update(id, name, emailNotifications) {
            _checks[id] = {
                name,
                emailNotifications
            };
        }

        function destroy(id) {
            delete _checks[id];
        }

        function setUpdateTarget(id) {
            _updateTarget = _checks[id];
        }

        const ChecksStore = assign({}, EventEmitter.prototype, {
            getAll: function() {
                return _checks;
            },
            getSingle: function(id) {
                return _checks[id];
            },
            getSelected: function() {
                return _updateTarget;
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

            const history = action.history,
                  checks = action.checks;
            const name = action.name,
                  domainNameOrIP = action.domainNameOrIP,
                  port = action.port,
                  emailNotifications = action.emailNotifications,
                  id   = action.id;

            switch(action.actionType) {
                case ChecksConstants.CHECK_POPULATE_SINGLE:
                    populateSingle(id, history, stats);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_POPULATE_ALL:
                    populateAll(checks);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_CREATE:
                    create(id, name, domainNameOrIP, port, emailNotifications);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_UPDATE:
                    update(id, name, emailNotifications);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_DESTROY:
                    destroy(id);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.OPEN_CHECK_UPDATE:
                    setUpdateTarget(id);
                    ChecksStore.emitChange();
                    break;

                default:
            }
        });

        return ChecksStore;
    }
);

