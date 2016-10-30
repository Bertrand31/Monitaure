import * as types from './Constants';

export const reportsReducer = (state = [], action) => {
    switch (action.type) {
        case types.REPORTS_HYDRATE: {
            return [
                ...action.reports,
            ];
        }

        default:
            return state;
    }
};

export default reportsReducer;
