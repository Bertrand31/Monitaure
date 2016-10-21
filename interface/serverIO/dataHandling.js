// Security
export function csrfToken(ajaxGet, callback) {
    const url = `${window.location.origin}/csrfToken/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}

// Users management
export function getUserData(ajaxGet, callback) {
    const url = `${window.location.origin}/User/getdata/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}
export function createUser(ajaxPost, data, callback) {
    const url = `${window.location.origin}/User/create/`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function setGCMCredentials(ajaxPost, data, callback) {
    const url = `${window.location.origin}/User/setgcmcredentials/`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function login(ajaxPost, data, callback) {
    const url = `${window.location.origin}/Auth/login/`;
    ajaxPost(url, data, (err, resJSON) => callback(err, resJSON));
}
export function logout(ajaxPost, callback) {
    const url = `${window.location.origin}/Auth/logout/`;
    ajaxPost(url, {}, (err, resJSON) => callback(err, resJSON));
}
export function isLoggedIn(ajaxGet, callback) {
    const url = `${window.location.origin}/Auth/isLoggedIn/`;
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
export function getChecks(ajaxGet, callback) {
    const url = `${window.location.origin}/Check/getchecks/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}

// Log management
export function getLog(ajaxGet, callback) {
    const url = `${window.location.origin}/Log/getall/`;
    ajaxGet(url, (err, resJSON) => callback(err, resJSON));
}
