// Security
export function csrfToken(ajaxGet, callback) {
    const url = `${window.location.origin}/csrfToken/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}

// Users management
export function createUser(ajaxPost, data, callback) {
    const url = `${window.location.origin}/User/create/`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function setGCMCredentials(ajaxPost, data, callback) {
    const url = `${window.location.origin}/User/setgcmcredentials/`;
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
export function isLoggedIn(ajaxGet, callback) {
    const url = `${window.location.origin}/isLoggedIn/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
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
export function getUserAndChecks(ajaxGet, callback) {
    const url = `${window.location.origin}/Check/getuserandchecks/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}
