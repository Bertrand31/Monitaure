import * as types from './Constants';

export function hydrateReports(reports) {
    return {
        type: types.REPORTS_HYDRATE,
        reports,
    };
}
