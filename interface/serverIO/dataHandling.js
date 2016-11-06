// Security
export function csrfToken(ajaxGet, callback) {
    const url = `${window.location.origin}/csrfToken/`;
    ajaxGet(url, callback);
}

// Users management
export function confirmAccount(ajaxGet, confirmationToken, callback) {
    const url = `${window.location.origin}/User/confirm/${confirmationToken}`;
    ajaxGet(url, callback);
}
export function getUserData(ajaxGet, callback) {
    const url = `${window.location.origin}/User/`;
    ajaxGet(url, callback);
}
export function createUser(ajaxPost, data, callback) {
    const url = `${window.location.origin}/User/`;
    ajaxPost(url, data, callback);
}
export function setGCMCredentials(ajaxPost, data, callback) {
    const url = `${window.location.origin}/User/setgcmcredentials/`;
    ajaxPost(url, data, callback);
}
export function login(ajaxPost, data, callback) {
    const url = `${window.location.origin}/Auth/login/`;
    ajaxPost(url, data, callback);
}
export function logout(ajaxPost, callback) {
    const url = `${window.location.origin}/Auth/logout/`;
    ajaxPost(url, {}, callback);
}
export function isLoggedIn(ajaxGet, callback) {
    const url = `${window.location.origin}/Auth/isLoggedIn/`;
    ajaxGet(url, callback);
}

// Checks management
export function getChecks(ajaxGet, callback) {
    const url = `${window.location.origin}/Check/`;
    ajaxGet(url, callback);
}
export function createCheck(ajaxPost, data, callback) {
    const url = `${window.location.origin}/Check/`;
    ajaxPost(url, data, callback);
}
export function updateCheck(ajaxPut, data, callback) {
    const url = `${window.location.origin}/Check/${data.id}/`;
    ajaxPut(url, data, callback);
}
export function destroyCheck(ajaxDelete, checkId, callback) {
    const url = `${window.location.origin}/Check/${checkId}/`;
    ajaxDelete(url, callback);
}

// Log management
export function getLog(ajaxGet, callback) {
    const url = `${window.location.origin}/Log/getall/`;
    ajaxGet(url, callback);
}

// Reports management
export function getReports(ajaxGet, callback) {
    const url = `${window.location.origin}/Reports/getall/`;
    ajaxGet(url, callback);
}
