const handleError = (res) => {
    if (!res.ok) throw Error(res.statusText);
    return res.json();
};

export function GETer(url, callback) {
    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
    })
    .then(handleError)
    .then(json => callback(null, json))
    .catch(err => callback(err, null));
};

export function POSTer(url, data, callback) {
    fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': sessionStorage.getItem('csrfToken'),
        }),
    })
    .then(handleError)
    .then(json => callback(null, json))
    .catch(err => callback(err, null));
};

export function PUTer(url, data, callback) {
    fetch(url, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': sessionStorage.getItem('csrfToken'),
        }),
    })
    .then(handleError)
    .then(json => callback(null, json))
    .catch(err => callback(err, null));
};

export function DELETEer(url,  callback) {
    fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': sessionStorage.getItem('csrfToken'),
        }),
    })
    .then(handleError)
    .then(json => callback(null, json))
    .catch(err => callback(err, null));
};
