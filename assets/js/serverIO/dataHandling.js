export default {
    // Users management
    createUser(ajaxPost, data, callback) {
        const url = `${window.location.origin}/User/create/`;
        ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
    },
    // Checks management
    createCheck(ajaxPost, data, callback) {
        const url = `${window.location.origin}/Check/create`;
        ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
    },
    updateCheck(ajaxPost, data, callback) {
        const url = `${window.location.origin}/Check/update`;
        ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
    },
    destroyCheck(ajaxGet, checkId, callback) {
        const url = `${window.location.origin}/Check/destroy/${checkId}`;
        ajaxGet(url, (err, resJSON) => callback(err, resJSON));
    },
    getUserAndGlobalStats(ajaxGet, callback) {
        const url = `${window.location.origin}/Check/getuserandglobalstats/`;
        ajaxGet(url, (err, resJSON) => callback(err, resJSON));
    },
    getCheckStats(ajaxGet, checkId, callback) {
        const url = `${window.location.origin}/Check/getcheckstats/${checkId}`;
        ajaxGet(url, (err, resJSON) => callback(err, resJSON));
    },
};
