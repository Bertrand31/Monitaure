// Users management
export function createUser(ajaxPost, data, callback) {
    const url = `${window.location.origin}/User/create/`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function login(ajaxPost, data, callback) {
    const url = `${window.location.origin}/login/`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function logout(ajaxPost, callback) {
    const url = `${window.location.origin}/logout/`;
    ajaxPost(url, {}, (err, resJSON) => callback(err, resJSON));
}
// Checks management
export function createCheck(ajaxPost, data, callback) {
    const url = `${window.location.origin}/Check/create`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function updateCheck(ajaxPost, data, callback) {
    const url = `${window.location.origin}/Check/update`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function destroyCheck(ajaxGet, checkId, callback) {
    const url = `${window.location.origin}/Check/destroy/${checkId}`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}
export function getUserAndGlobalStats(ajaxGet, callback) {
    const url = `${window.location.origin}/Check/getuserandglobalstats/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}
export function getCheckStats(ajaxGet, checkId, callback) {
    const url = `${window.location.origin}/Check/getcheckstats/${checkId}`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}
