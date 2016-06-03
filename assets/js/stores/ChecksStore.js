define(['../dispatcher/AppDispatcher', 'events', '../constants/ChecksConstants', 'object-assign', '../serverIO/ajaxMethods', '../serverIO/dataHandling', '../actions/PopinsActions'],

    function(AppDispatcher, events, ChecksConstants, assign, ajaxMethods, dataHandling, PopinsActions) {

        const EventEmitter = events.EventEmitter;

        const CHANGE_EVENT = 'change';

        const _checks = {};
        let   _workingCheck = null;

        function populateSingle(id, history, stats) {
            _checks[id].history = history;
            _checks[id].stats = stats;
        }
        function populateAll() {
            dataHandling.getAllStats(ajaxMethods.GETer, function(err, data) {
                if (err) return PopinsActions.create('alert', err.reponseText);
                // TODO: améliorer la route pour ne retourner que les checks
                data.userData.checks.map((check) => {
                    _checks[check.id] = check;
                    ChecksStore.emitChange();
                });
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
            // AJAX CALL
            dataHandling.destroyCheck(ajaxMethods.POSTer, id, function(err) {
                if (err) return PopinsActions.create('alert', err.reponseText);
            });
        }

        function setWorkingCheck(id = null) {
            if (id !== null)
                _workingCheck = _checks[id];
            else
                _workingCheck = null;
        }
        function updateWorkingCheck(attrName, attrValue) {
            _workingCheck[attrName] = attrValue;

        }
        function saveWorkingCheck() {
            _checks[_workingCheck.id] = _workingCheck;
            dataHandling.updateCheck(ajaxMethods.POSTer, _workingCheck, function(err, data) {
                if (err) return PopinsActions.create('alert', err.reponseText);
                console.log(data);
            });
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
                    populateAll();
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

                case ChecksConstants.SET_WORKING_CHECK:
                    setWorkingCheck(id);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.UPDATE_WORKING_CHECK:
                    updateWorkingCheck(attrName, attrValue);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.SAVE_WORKING_CHECK:
                    saveWorkingCheck();
                    ChecksStore.emitChange();
                    break;

                default:
            }
        });

        return ChecksStore;
    }
);

