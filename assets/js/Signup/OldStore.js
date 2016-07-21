import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';

const EventEmitter = events.EventEmitter;

const CHANGE_EVENT = 'change';

let _user = {};

function update(AttrName, AttrValue) {
    _user[AttrName] = AttrValue;
}

function signup(user) {
    _user = user;
}

const UserStore = assign({}, EventEmitter.prototype, {
    getUser() {
        return _user;
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

UserStore.dispatchToken = AppDispatcher.register(function(action) {

    const AttrName = action.AttrName;
    const AttrValue = action.AttrValue;
    const user = action.user;

    switch (action.actionType) {
        case UserConstants.USER_UPDATE:
            update(AttrName, AttrValue);
            UserStore.emitChange();
            break;

        case UserConstants.USER_SIGNUP:
            signup(user);
            UserStore.emitChange();
            break;

        default:
    }
});

export default UserStore;
