define(['../dispatcher/AppDispatcher', 'events', '../constants/ChecksConstants', 'object-assign'],

    function(AppDispatcher, events, ChecksConstants, assign) {

        const EventEmitter = events.EventEmitter;

        const CHANGE_EVENT = 'change';

        const _checks = {};
        let _globalStats = {};
        let _openCheckID = '';

        function populateSingle(id, data) {
            _openCheckID = id;
            _checks[id].history = data.history;
            _checks[id].stats = data.stats;

        }
        function populateAll(allChecks, globalStats) {
            allChecks.map((check) => {
                _checks[check.id] = check;
            });
            _globalStats = globalStats;
        }

        function create(data) {
            _checks[data.id] = data;
        }
        function destroy(id) {
            delete _checks[id];
        }

        function createWorkingCheck() {
            _checks['tmpID'] = {
                id: 'tmpID',
                name: '',
                domainNameOrIP: '',
                history: [],
                port: null,
                emailNotifications: false,
                isEditing: true
            };
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
            getAll() {
                return _checks;
            },
            getOpenCheckID() {
                return _openCheckID;
            },
            getSingle(id) {
                return _checks[id];
            },
            getGlobalStats() {
                return _globalStats;
            },
            emitChange() {
                this.emit(CHANGE_EVENT);
            },
            addChangeListener(callback) {
                this.on(CHANGE_EVENT, callback);
            },
            removeChangeListener(callback) {
                this.removeListener(CHANGE_EVENT, callback);
            }
        });

        ChecksStore.dispatchToken = AppDispatcher.register(function(action) {

            const allChecks = action.allChecks,
                  globalStats = action.globalStats;
            const data = action.data;
            const history = action.history;
            const name = action.name,
                  domainNameOrIP = action.domainNameOrIP,
                  port = action.port,
                  emailNotifications = action.emailNotifications,
                  id = action.id;
            const attrName = action.attrName,
                  attrValue = action.attrValue;

            switch(action.actionType) {

                case ChecksConstants.CHECK_POPULATE_ALL:
                    populateAll(allChecks, globalStats);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_CREATE:
                    create(data);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CHECK_DESTROY:
                    destroy(id);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.OPEN_CHECK_STATS:
                    populateSingle(id, data);
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CLOSE_CHECK_STATS:
                    ChecksStore.emitChange();
                    break;

                case ChecksConstants.CREATE_WORKING_CHECK:
                    createWorkingCheck();
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

