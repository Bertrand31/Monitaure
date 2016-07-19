import AppDispatcher from '../dispatcher/AppDispatcher';
import PopinsConstants from '../constants/PopinsConstants';

const PopinsActions = {

    create(type, text) {
        AppDispatcher.dispatch({
            actionType: PopinsConstants.POPIN_CREATE,
            type,
            text
        });
    },

    destroy(id) {
        AppDispatcher.dispatch({
            actionType: PopinsConstants.POPIN_DESTROY,
            id
        });
    }
};

export default PopinsActions;
