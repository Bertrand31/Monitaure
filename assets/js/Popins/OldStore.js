import AppDispatcher from '../dispatcher/AppDispatcher';
import events from 'events';
import PopinsConstants from '../constants/PopinsConstants';

const EventEmitter = events.EventEmitter;

const CHANGE_EVENT = 'change';

const _popins = {};

function create(type, text) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _popins[id] = {
        id,
        type,
        text
    };
}

function destroy(id) {
    delete _popins[id];
}

const PopinsStore = assign({}, EventEmitter.prototype, {
    getAll() {
        return _popins;
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

PopinsStore.dispatchToken = AppDispatcher.register(function(action) {

    const type = action.type,
            text = action.text,
            id = action.id;

    switch (action.actionType) {
        case PopinsConstants.POPIN_CREATE:
            create(type, text);
            PopinsStore.emitChange();
            break;

        case PopinsConstants.POPIN_DESTROY:
            destroy(id);
            PopinsStore.emitChange();
            break;

        default:
    }
});

export default PopinsStore;
